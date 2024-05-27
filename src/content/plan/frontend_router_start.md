---
title: Знакомство с React Router
description: Установка, простая настройка и несколько основных компонентов из пакета `react-router-dom` v6
order: 1
slug: b7bdf418-aa1b-48a5-bb86-84106bb9ab37
---

1. Установим пакет React Router:

```bash
npm install react-router-dom
```

2. В основном файле `main.jsx`(`index.js` для Create-React-App), который находится в папке 
`src/`, обернём компонент `<App />` в компонент `<BrowserRouter>` из пакета `react-router-dom`:
```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
```

3. В папке с кодом, которая называется `src/`, создадим папки `pages` и `components`. Папка `pages` будет хранить наши 
страницы, а папка `components` будет хранить компоненты(которые не являются страницами)
В папке `src/pages` создадим пару компонентов - для главной страницы и для страницы "О нас":

```jsx
// src/pages/MainPage.jsx
const MainPage = () => {
  return <h1>Главная страница</h1>;
};
export default MainPage;

// src/pages/AboutPage.jsx
const AboutPage = () => {
  return <h1>О нас</h1>;
};
export default AboutPage;
```

4. В файле `App.jsx` опишем маршруты, по которым будут открываться наши страницы:

```jsx
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />

      
      <Route path="*" element={<h1>404</h1>} /> // Для заглушки для несуществующих маршрутов
    </Routes>
  );
};
```

5. Можно добавить меню для навигации:
```jsx
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/about">О нас</NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default NavBar
```
И стилизовать активный пункт меню можно с помощью CSS:

```css
nav li a.active { /* класс active - обязательный */
  color: red;
}
```

6. Создадим компонент, так называемый `Layout`, который будет включать в себя общие элементы для всех страниц,
такие как меню, навигацию, подвал(footer) и т.д.

```jsx
// src/pages/Layout.jsx
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';

const Layout = () => {
  return (
    <div>
      <header> <NavBar /> </header>
      <main> <Outlet /> </main>
      <footer> Geeks 2024 </footer>
    </div>
  );
};
export default Layout;
```

7. Чтобы все остальные страницы отрисовывались внутри `Layout` добавим общий маршрут, в который обернем все остальные маршруты:

```jsx
// src/App.jsx
import Layout from './pages/Layout';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}> // обернем все маршруты
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />

          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
  )
}
```

