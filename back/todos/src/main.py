from fastapi import FastAPI
from pydantic import BaseModel

class CreateToDoRequest(BaseModel):
    id: int
    contents: str
    is_done: bool


app = FastAPI()

todo_data = {
    1: {
        'id': 1,
        'contents': 'FastAPI 1',
        'is_done': True,
    },
    2: {
        'id': 2,
        'contents': 'FastAPI 2',
        'is_done': False,
    },
    3: {
        'id': 3,
        'contents': 'FastAPI 3',
        'is_done': False,
    },
}
@app.get('/')
def heath_check_handler():
    return {'ping':'pong'}

@app.get('/todos')
def get_todos_handler(order: str | None = None):
    ret = list(todo_data.values())
    if order and order == 'DESC':
        return ret[::-1]
    return ret

@app.post('/todos')
def create_todo_handler(request: CreateToDoRequest):
    todo_data[request.id] = request.dict()
    return todo_data[request.id]

@app.get('/todos/{todo_id}')
def get_todo_handler(todo_id: int):
    return todo_data.get(todo_id, {})