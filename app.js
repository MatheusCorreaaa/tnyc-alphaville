const products = [
  { name: 'Avocado Toast', price: 40.90, category: 'brunch', image: 'avocado', description: 'Torrada integral com avocado, tomate fresco, sal, pimenta-do-reino e raspas de limão.' },
  { name: 'TNYC Breakfast', price: 39.90, category: 'brunch', image: 'breakfast', description: 'Avocado, tomates frescos, rúcula e ovos mexidos. Acompanha suco de laranja.' },
  { name: 'Cappuccino', price: 17.90, category: 'cafes', image: 'cafe', description: 'Café espresso e leite cremoso.' },
  { name: 'Croissant com cream cheese, bacon e ovo', price: 37.90, category: 'brunch', image: 'croissant', description: 'Massa folhada com cream cheese, bacon e ovo frito.' },
  { name: 'Chocolate Cake', price: 27.50, category: 'doces', image: 'bolo', description: 'Bolo de chocolate com ganache.' },
  { name: 'Espresso', price: 9.90, category: 'cafes', description: 'Uma dose de espresso.' },
  { name: 'Americano', price: 11.90, category: 'cafes', description: 'Espresso alongado com água quente.' },
  { name: 'Hario V60', price: 19.90, category: 'cafes', description: 'Café preparado no filtro Hario V60.' },
  { name: 'Espresso tônica', price: 19.90, category: 'cafes', description: 'Espresso, água tônica, gelo e limão.' },
  { name: 'Pink Lemonade', price: 19.90, category: 'cafes', description: 'Limonada batida com compota de frutas vermelhas.' },
  { name: 'TNYC Brunch', price: 120, category: 'brunch', image: 'brunch', description: 'Escolha uma bebida de boas-vindas, uma entrada, um principal, uma bebida final e uma sobremesa.' },
  { name: 'Mini quiche de alho-poró', price: 32.90, category: 'brunch', description: 'Quiche de alho-poró.' },
  { name: 'Cinnamon Roll', price: 19.90, category: 'doces', image: 'cinnamon', description: 'Pão doce de canela com cobertura de cream cheese.' },
  { name: 'Cheesecake', price: 23.90, category: 'doces', description: 'Frutas vermelhas ou doce de leite.' },
  { name: 'Panquecas com chocolate e frutas', price: 34.90, category: 'doces', image: 'panquecas', description: 'Panquecas com calda de chocolate e frutas frescas.' },
];
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const grid = document.querySelector('#menu-grid');
const filters = [...document.querySelectorAll('[data-category]')];

function showProducts(category) {
  const visible = category === 'todos' ? products.slice(0, 3) : products.filter(product => product.category === category);
  const cards = visible.map(product => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    if (product.image) {
      const image = document.createElement('img');
      image.src = 'assets/' + product.image + '.webp';
      image.loading = 'lazy';
      image.alt = '';
      card.append(image);
    }
    const body = document.createElement('div');
    body.className = 'menu-card-body';
    const title = document.createElement('h3');
    title.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description;
    const price = document.createElement('strong');
    price.textContent = currency.format(product.price);
    body.append(title, description, price);
    card.append(body);
    return card;
  });
  grid.replaceChildren(...cards);
  document.querySelector('#menu-status').textContent = visible.length + ' itens no cardápio.';
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
}

filters.forEach(button => button.addEventListener('click', () => showProducts(button.dataset.category)));
showProducts('todos');

const scene = document.querySelector('.scene');
function playIntro() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setPaused(false);
  scene.classList.remove('playing');
  void scene.offsetWidth;
  scene.classList.add('playing');
}
const motionToggle = document.querySelector('.motion-toggle');
function setPaused(paused) {
  scene.classList.toggle('paused', paused);
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.textContent = paused ? 'Continuar animação' : 'Pausar animação';
}
motionToggle.addEventListener('click', () => setPaused(!scene.classList.contains('paused')));
document.querySelector('.replay').addEventListener('click', playIntro);
playIntro();

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
function setNavigation(open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}
toggle.addEventListener('click', () => setNavigation(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavigation(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    setNavigation(false);
    toggle.focus();
  }
});

const reviews = [...document.querySelectorAll('.review')];
const position = document.querySelector('.review-position');
let reviewIndex = 0;
document.querySelectorAll('[data-review-step]').forEach(button => {
  button.addEventListener('click', () => {
    reviews[reviewIndex].hidden = true;
    reviewIndex = (reviewIndex + Number(button.dataset.reviewStep) + reviews.length) % reviews.length;
    reviews[reviewIndex].hidden = false;
    position.textContent = (reviewIndex + 1) + ' / ' + reviews.length;
  });
});

const dialog = document.querySelector('#menu-dialog');
const fullMenu = document.querySelector('#full-menu');
document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', () => {
    const page = button.dataset.page;
    fullMenu.src = 'assets/cardapio-' + page + '.jpg';
    fullMenu.alt = page === '1' ? 'Página de cafés, bebidas e doces' : 'Página de brunch, pães e salgados';
    dialog.showModal();
    dialog.scrollTop = 0;
  });
});
