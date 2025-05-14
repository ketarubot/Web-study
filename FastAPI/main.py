from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def print_root():
    return 'Hello, World!'