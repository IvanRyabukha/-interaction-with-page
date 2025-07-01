/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против..."
    ]
  };

  const promoAdv = document.querySelectorAll('.promo__adv img');
  const bg = document.querySelector('.promo__bg');
  const gener = bg.querySelector('.promo__genre');
  const movieList = document.querySelector('.promo__interactive-list');

  const form = document.querySelector('.add');
  const inputElement = form.querySelector('.adding__input');
  const checkbox = form.querySelector('input[type="checkbox"]');


  const deleteAdv = (arr) => {
    arr.forEach(element => {
      element.remove();
    });
  };

  const makeChanges = () => {
    gener.textContent = 'драма';
    bg.style.backgroundImage = `url('/img/bg.jpg')`;
  };

  const sortArr = (arr) => {
    arr.sort();
  };

  function renderMoviesList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);
    films.forEach((film, i) => {
      parent.innerHTML += `
      <li class="promo__interactive-item">${i + 1}. ${film}
        <div class="delete"></div>
      </li>
    `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);

        renderMoviesList(films, parent);
      });
    });
  };

  const addFilm = (e) => {
    e.preventDefault();
    const inputValue = inputElement.value.length > 21 ? `${inputElement.value.slice(0, 22)}...` : inputElement.value;
    const checkboxValue = checkbox.checked;

    if (inputValue) {
      movieDB.movies.push(inputValue.trim());
      renderMoviesList(movieDB.movies, movieList);

      if (checkboxValue) {
        console.log('Добавляем любимый фильм');
      }
    }

    e.target.reset();
  };

  deleteAdv(promoAdv);
  makeChanges();
  renderMoviesList(movieDB.movies, movieList);

  form.addEventListener('submit', addFilm);
});


