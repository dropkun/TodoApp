# Use the official Rust image as a parent image
FROM rust:latest

# Set the working directory inside the container
WORKDIR /backend

# Copy your Rust project files into the container
COPY . .

# Build the Rust application
RUN cargo build --release

ENV PORT 8080

# Specify the startup command
CMD ["./target/release/backend"]
