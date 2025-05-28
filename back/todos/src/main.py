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

@app.get('/add/{a}_{b}', summary='더하기', tags=['simple'])
def add(a: int, b: int):
    '''
    더하기
    - a, b 받아서 출력(문자열일 경우 오류)
    '''
    return a+b

@app.get('/help', summary='도움말', tags=['simple'])
def helper():
    '''
    도움말
    - 각 path의 기능을 설명
    '''
    return {'/': 'hello world 출력', '/greet/{name}': 'Hello, {name}! 출력'}