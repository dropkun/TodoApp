pub mod model;
use model::Task;
use model::TaskResponse;

use futures::stream::TryStreamExt;
use mongodb::bson::{Document, doc, oid::ObjectId};
use mongodb::{options::{ClientOptions, FindOptions}, Client, Collection};

#[derive(Clone, Debug)]
pub struct DB {
    pub task_collection: Collection<Task>,
    pub collection: Collection<Document>,
}

use std::str::FromStr;

type Result<T> = std::result::Result<T, mongodb::error::Error>;

impl DB {
    pub async fn init() -> Result<Self> {
        let mongodb_uri = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
        let database_name =
            std::env::var("MONGO_INITDB_DATABASE").expect("MONGO_INITDB_DATABASE must be set.");
        let collection_name =
            std::env::var("MONGODB_NOTE_COLLECTION").expect("MONGODB_NOTE_COLLECTION must be set.");

        let mut client_options = ClientOptions::parse(mongodb_uri).await?;
        client_options.app_name = Some(database_name.to_string());

        let client = Client::with_options(client_options)?;
        let database = client.database(database_name.as_str());

        let task_collection = database.collection(collection_name.as_str());
        let collection = database.collection::<Document>(collection_name.as_str());

        //ping db
        client
            .database("admin")
            .run_command(doc! {"ping": 1}, None)
            .await?;

        println!("✅ Database connected successfully");

        Ok(Self {
            task_collection,
            collection,
        })
    }

    pub async fn get_tasks(&self) -> Result<Vec<TaskResponse>> {
        let mut tasks: Vec<TaskResponse> = Vec::new();
        let options = FindOptions::default();
        let mut cursor = self.task_collection.find(None, options).await?;

        while let Some(task) = cursor.try_next().await? {
            match task.id {
                Some(id) => {
                    let task_res = TaskResponse {
                        id: task.id.unwrap().to_hex(),
                        title: task.title,
                        date: task.date,
                        is_completed: task.is_completed,
                    };
                    tasks.push(task_res);
                },
                None => println!("No tasks"),
            }
        }

        println!("✅ Successfully found {} tasks", tasks.len());

        Ok(tasks)
    }

    pub async fn get_task(&self, id: &str) -> Result<Task> {
        let oid = ObjectId::from_str(id).unwrap();
        println!("🔍 Searching for task with oid: {}", oid);
        let filter = doc! {"_id": oid};
        let result = self.task_collection.find_one(filter, None).await?;

        Ok(result.unwrap())
    }

    pub async fn insert_task(&self, task: Task) -> Result<()> {
        println!("🔍 Inserting task: {:?}", task);
        let result = self.task_collection.insert_one(task, None).await?;
        println!("Inserted document with _id: {}", result.inserted_id);
        println!("✅ Successfully inserted task");

        Ok(())
    }

    pub async fn update_task(&self, task: Task) -> Result<()> {
        let filter = doc! {"_id": task.id.clone()};
        let result = self.task_collection.replace_one(filter, task, None).await?;

        println!("✅ Successfully updated task");

        Ok(())
    }

    pub async fn delete_task(&self, id: &str) -> Result<()> {
        let oid = ObjectId::from_str(id).unwrap();
        let filter = doc! {"_id": oid};
        let result = self.task_collection.delete_one(filter, None).await?;

        println!("✅ Successfully deleted task");

        Ok(())
    }
}