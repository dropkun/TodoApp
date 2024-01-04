const API_URL = import.meta.env.BACKAPI_URL;

export const getTasks = async () => {
  console.log(API_URL);
  try {
    const response = await fetch(API_URL + '/tasks', {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await fetch(API_URL + '/task/' + id, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTask = async (taskname: string) => {
  try {
    const response = await fetch(API_URL + '/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskname,
      }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(API_URL + '/task/' + id, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
