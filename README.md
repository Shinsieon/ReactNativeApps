# ReactNativeApps
Any Apps developed by ReactNative

## myTodoApp
### Nomad Coder 강의를 수강하며 따라 만든 TODO 앱입니다. 챌린지 코드도 추가했구요.
- 챌린지 과제 -
1. 앱을 껐다 켜도 마지막 탭 기억하기
: AsyncStorage 를 사용하여 탭이 전환될때 마다 setItem 후 useEffect() 로 앱 처음 구동할때 AsyncStorage.getItem 으로 가져와서 세팅
2. 완료한 TODO 체크하여 표시하기
: toDo object 에 checkDone 이라는 키를 추가해 체크박스 눌릴때마다 값 변경. 
3. TODO 수정하기
: longPressed 함수를 이용해 TODO 아이템을 오래 누르면 수정할 수 있는 alert를 띄움.
<img src="![ezgif com-gif-maker](https://user-images.githubusercontent.com/56333934/216771003-343dbf6b-82cc-4b59-8715-93bce3f21ba1.gif)"/>

