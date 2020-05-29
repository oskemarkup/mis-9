const patternsContainer = document.querySelector('.patterns');
const addPatternButton = document.querySelector('.js-add-pattern');
const formElement = document.querySelector('#form');
const listElement = document.querySelector('#list');
const alertElement = document.querySelector('#alert');
const alertFailElement = document.querySelector('#alertFail');
const textField = document.querySelector('#text');
const patternTemplate = document.querySelector('#pattern');
const itemTemplate = document.querySelector('#item');

function createPatternInput() {
  return patternTemplate.content.cloneNode(true);
}

function appendPatternInput() {
  patternsContainer.appendChild(createPatternInput());
}

addPatternButton.addEventListener('click', appendPatternInput);
patternsContainer.addEventListener('click', event => {
  const { target } = event;

  if (target.classList.contains('js-remove-pattern')) {
    target.closest('.form-row').remove();
  }
});

function aaa(event) {
  event.preventDefault();
  const patternsElements = document.querySelectorAll('.pattern');
  const patterns = [...patternsElements].map(el => el.value);
  const ac = new AhoCorasick(patterns);
  const result = ac.find(textField.value);

  console.log(result);

  listElement.innerHTML = '';
  alertElement.remove();
  alertFailElement.classList.toggle('d-none', Boolean(result.length));

  result.forEach(([pattern, position]) => {
    const element = document.importNode(itemTemplate.content, true);

    element.querySelector('.word').textContent = pattern;
    element.querySelector('.badge').textContent = position;
    listElement.appendChild(element);
  });
}

formElement.addEventListener('submit', aaa);
