<!-- Конспект по обучению реакту -->
<!-- npx create-react-app react-app -->
<!-- Ctrl+D -Выделить следующую такую же выделенную конструкцию -->
<!-- Тэги не требующие закрытия в html в jsx нужно зарывать так <tag />. Наример : <input />  -->
<!-- Чтобы передать пропсы не в виде строки, то вместо "" оборачиваем это в {}. Это работает с любыми типами данных -->
<!-- 						<PizzaBlock title="Туапсинская" price="700"/>  число передастся в виде строки-->
<!-- 						<PizzaBlock title="Краснодарская" price={800}/> число передастся в виде числа-->


<!-- Так как props - это объект. Чтобы сократить код, можно не обращаясь к props, доставать из него price, а просто прописать в {} price, но для этого нужно вытащить все элементы из props на этапе объявления функционального компонетна (декструктуризация пропса). Для этого в фигурных скобках, описываем вытаскиваемые элементы -->
    <!-- 				<div class="pizza-block__price">от {price} ₽</div>
    			 			<div class="pizza-block__price">от {props.price} ₽</div>  -->
<!-- function PizzaBlock({ title, price }) {}
	// function PizzaBlock(props) {} -->

<!-- Деструктуризация объекта. Простейший пример -->
<!--
 const obj={a:1,b:2,c:3};
const a = obj.a
const b = obj.b
const c = obj.c
console.log(a,b,c)
 -->
<!-- 
const {a,b,c}={a:1,b:2,c:3};
console.log(a,b,c)
 -->
 <!-- Эти 2 блока кода выше делают одно и то же -->

<!-- В jsx нужно писать className, вместо class в html -->




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
