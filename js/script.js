{
  'use strict';

  /* OPTIONS */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  /* ***1. WYŚWIETLANIE PRAWIDŁOWEGO ARTYKUŁU PO KLIKNIECIU W LINK NA LIŚCIE TYTUŁÓW (i pogrubienie czcionki dla aktywnego linka)*** */
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    /* [DONE] remove class 'active' from all article links  */
    const articleLinks = document.querySelectorAll('.titles a.active');

    for(let articleLink of articleLinks){
      articleLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle', targetArticle);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    
  };

  /* ***2. GENEROWANIE LISTY TYTUŁÓW I WSTAWIENIE JEJ DO LEWEJ KOLUMNY*** */
  const generateTitleLinks = function(customSelector = ''){
    
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (const article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  /* ***3. GENEROWANIE TAGÓW W ARTYKUŁACh*** */
  const generateTags = function(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray){
        /* [DONE] generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* [DONE] add generated code to html variable */
        html = html + tagHTML;
      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
    }
  };
  
  generateTags();

  /* ***4. FILTROWANIE LISTY ARTYKÓŁÓW PO KLIKNIĘCIU W TAGI*** */
  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (const activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (const tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  
  const addClickListenersToTags = function(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    } 
    /* END LOOP: for each link */
  };
  
  addClickListenersToTags();

  /* ***5. GENEROWANIE AUTORÓW W ARTYKUŁACh (jako linki)*** */
  const generateAuthors = function(){
    const articles = document.querySelectorAll(optArticleSelector);

    for (const article of articles) {
      const articleWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const articleAuthor = article.getAttribute('data-author');

      const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      html = html + authorHTML;

      articleWrapper.innerHTML = html;
    }
  };

  generateAuthors();
  /* ***6. FILTROWANIE LISTY ARTYKÓŁÓW PO KLIKNIĘCIU W AUTORA *** */
  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (const authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function(){
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    for (const authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();
}

/*
const add = document.querySelector('#add');

add.addEventListener('click', function(){
  const element = document.querySelector('#element');
  
  const value = element.value;
  console.log(value)
  
  const todo = document.querySelector('#todo');
  let todoHTML = todo.innerHTML;
  console.log(todoHTML);
  
  const liValue = '<li>' + value + '</li>'
  
  todoHTML = todoHTML + liValue;
  todo.innerHTML = todoHTML;
});
*/

/*
<button id="add">add</button>
<input id="element" type="text"/>
<ul id="todo"></ul>
*/