# 패키지 설치
```
$ npm i axios react-router-dom react-redux react-icons sass @reduxjs/toolkit react-loading-skeleton
```
# 폴더 구조 생성
```
/src
  /assets
  /components
  /hooks
  /pages
  /store
```

# React Hook Form
- 장점
  - React Hook Form을 사용하면 Hook을 만들어 사용하는것보다 소스코드의 정리가 편해진다.
  - 다른 라이브러리들에 비해 성능이 좋고, 사이즈가 작다.
  - React의 Hooks를 통해서 기존에 존재하는 form들과 결합이 쉬워 사용하기 편하다.

- 앱을 생성할때 form태그 부분의 컨트롤 하는것이 중요하다.
## 설치
```
$ npm i react-hook-form
```
## 사용
- register :
  - 원하는 form에 register함수를 통해 등록하면 react hooks from에서
    검증(validation)과 제출(submission)에서 form을 통해 입력된 값들이 사용 가능해진다.
  - 그렇기 때문에 입력을 받고자 하는 모든 필드에는 반드시 register함수를 사용해 주어야 한다.
  - 파라미터로 name과 option을 받음
    - name : input이나 select element를 다루기 위한 key값(필수)
    - option : 검사를 위한 추가 옵션 
      - required: 'string'
      - minLength:{value:0,message:string}
- handleSubmit :
  - handleSubmit이 넘겨주는 데이터는 watch함수가마지막으로 출력하는 데이터와 동일
- formState:{errors} :
- reset : 
  - input에 입력된 값을 초기화 시켜준다.(submit시 초기화 등등)
- watch() : input에서 입력하는 값을 실시간으로 확인할 수 있게 해준다.
- 사용하기
  ```jsx
  import {useForm} from 'react-hook-form'
  export default function App(){
    const {register, handleSubmit, formState:{srrors}, reset} = useForm({mode:"onChange"})
    const onSubmit = ({field_name})=>{
      console.log(document.getElementsByName('field_name'))
      console.log({field_name})
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('field_name')}/>
      </form>
    )
  }
  ```

# mockapi
- 사이트 : http://mockapi.io/
## 사용법
- 프로젝트 1개는 무료임
- New Resourece => orders생성

# react TypeScript로 
```
$ npm i -D typescript @types/react @types/react-dom
```
## 타입 지정
- 컴포넌트 타입지정
  ```ts
  import {FC} from 'react'
  type AppProps = {
    max:number;
    min:number;
  };
  const App:FC<AppProps> = ({max,min}) =>{
    return <div>Hello</div>
  }
  export default App;
  ```
- react-hook-form
  ```ts
  type Inputs = {
    email:string;
    password:string;
  };
  import {SubmitHansler, FieldVaules} from 'react-hook-form'
  const onSubmint:SubmitHandler<FieldValues>  // Field : 필드
  ```
- redux
  - ReeturnType : 함수에서 반환하는 타입을 가져올 수 있게 해준다.
  ```ts
  // src/store/index.ts
  export type RootState = ReturnType<typeof store.getState>;
  // src/store/item/item.type.ts
  export type Item = {
    product:string;
    price:number;
    id:number;
  };
  // src/store/item/item.slice.ts
  import {Item} from './item.type.ts'
  import {createSlice,createAsyncThunk} from 'redux'
  import axios from 'axios'
  import {PayloadAction} from '@reduxjs/toolkit'
  type initialStateType ={
    item: Item;
    isLoading:boolean;
    error:string;
    count:number;
    name:string
  };
  const initialState:initialStateType ={
    item: {} as Item,
    isLoading:false,
    error:"",
    count:0,
    name:""
  }
  export const fetchItem = createAsyncThunk(
    'item/fetchItem',
    async (thunkAPI)=>{
      try{
        const response = await axios.get<Item>('요청주소');
        return response.data;
      } catch(error){
        return thunkAPI.rejectWitValue("Error loading products");
      }
    }
  )
  export const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers:{
      addName:(state,action:PayloadAction<string>)=>{
        state.name = action.payload
      }
    },
    extraReducers: (builder)=>{
      builder
        .addCase(fetchItem.pending, (state)=>{state.isLoading = true})
        .addCase(fetchItem.fulfilled, (state,action)=>{
          state.isLoading = false;
          state.item = action.payload;
          })
        .addCase(fetchItem.rejected,(state,action)=>{
          state.isLoading = false;
          state.error = action.payload as string;
        })
    }
  })
  // src/hooks/reduxts
  import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
  import { AppDispatch, RootState } from "../store";

  export const useAppDispatch = () => useDispatch<AppDispatch>(); 
  export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
  ```
- axios
  ```ts
  type IProduct ={
    name:string;
    count:number;
  }
  const fetchProduct = async() => {
    const response = await axios.get<IProduct>('https://fakestoreapi.com/roducts');
  }
  ```