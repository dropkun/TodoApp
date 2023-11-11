variable "project_id" {
  description = "project id"
  type        = string
  default     = "dropkun"
}

variable "default_region" {
  description = "The default region for resources"
  default     = "asia-northeast1"
}

variable "backend_name" {
  type = string
  default = "todo-backend"
}