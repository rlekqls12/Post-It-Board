# Post It Board

## 프로젝트 소개

1. 프론트엔드 개발자 채용 온라인 과제 제출을 위해 만들어졌습니다.
2. 보드 - 포스트잇 형태로 되어있는 메모 관리 프로젝트이며, ReactJS로 개발되었습니다.
3. 사용된 라이브러리는 아래와 같습니다.

 - react-redux
 - reselect
 - formik
 - uuid

4. 요청 사항 중 아래 사항을 완료하지 못 했습니다.
```
포스트잇의 테두리 부분을 드래그앤 드랍하여, 포스트잇의 크기를 조절합니다.
```

## 폴더 구조

- src/components : 각종 컴포넌트 존재
	- index.tsx : 리액트 컴포넌트 파일입니다.
	- index.css : CSS 파일입니다.
	- reselect.ts : reselect 커스텀 함수 파일입니다.
- src/redux/modules : 각종 리듀서 존재
	- focusBoardStore.ts : 현재 포커싱된 보드 ID를 저장합니다.
	- focusPostItStore.ts : 현재 포커싱된 포스트잇 ID를 저장합니다.
	- manageBoardStore.ts : 보드 배열을 저장합니다.
	- managePostItStore.ts : 보드별 포스트잇 배열을 저장합니다.
