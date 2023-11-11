resource "google_cloud_run_v2_service" "todo-backend" {
  name = "todo-backend"
  location = var.default_region

  template {
      containers {
        image = "asia-northeast1-docker.pkg.dev/dropkun/todo-backend/todo-backend:latest"
      }
  }
}

resource "google_cloud_run_service_iam_binding" "todo-backend" {
  location = google_cloud_run_v2_service.todo-backend.location
  service  = google_cloud_run_v2_service.todo-backend.name
  role     =  "roles/run.invoker"
  members = [
    "allUsers"
  ]
}