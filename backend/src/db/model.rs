use serde::{
    Serialize,
    Deserialize,
};
use mongodb::bson::oid::ObjectId;
use mongodb::bson::serde_helpers::serialize_hex_string_as_object_id;

#[derive(Debug, Serialize, Deserialize)]
pub struct Task{
    #[serde(rename = "_id" ,skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub title: String,
    pub date: String,
    pub is_completed: bool,
}

#[derive(Debug, Serialize)]
pub struct TaskResponse{
    pub id: String,
    pub title: String,
    pub date: String,
    pub is_completed: bool,
}