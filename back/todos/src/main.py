# FastAPI import
from fastapi import FastAPI

# FastAPI instance 생성. 
app = FastAPI()

# Path 오퍼레이션 생성. Path는 도메인명을 제외하고 / 로 시작하는 URL 부분
# 만약 url이 https://example.com/items/foo 라면 path는 /items/foo 
# Operation은 GET, POST, PUT/PATCH, DELETE등의 HTTP 메소드임. 
@app.get("/", summary="간단한 API", tags=["simple"])
def root():
    '''
    간단한 API
    - 인자값 1은 ~
    - 인자값 2는 ~
    '''
    return {"message": "Hello World"}

@app.get('/greet/{name}', summary='헬로', tags=['simple'])
def greet(name: str):
    '''
    헬로
    - 이름 받아서 Hello, {이름}! 출력
    '''
    return f'Hello, {name}!'
