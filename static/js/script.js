(() => {
  const html = document.documentElement;
  const loading = document.getElementById('zyyo-loading');
  const form = document.getElementById('skillForm');
  const nameInput = document.getElementById('skillName');
  const levelInput = document.getElementById('skillLevel');
  const list = document.getElementById('skillList');
  const storageKey = 'lokpzz-skills-v1';

  html.dataset.theme = 'Light';

  let skills = [];
  try { skills = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { skills = []; }
  const save = () => localStorage.setItem(storageKey, JSON.stringify(skills));
  const render = () => {
    list.replaceChildren();
    skills.forEach((skill, index) => {
      const chip = document.createElement('span');
      chip.className = 'skill-chip';
      chip.append(document.createTextNode(`${skill.name} · ${skill.level}`));
      const remove = document.createElement('button');
      remove.type = 'button'; remove.textContent = '移除'; remove.setAttribute('aria-label', `移除${skill.name}`);
      remove.addEventListener('click', () => { skills.splice(index, 1); save(); render(); });
      chip.append(remove); list.append(chip);
    });
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;
    if (skills.some(skill => skill.name.toLowerCase() === name.toLowerCase())) {
      nameInput.setCustomValidity('这项技能已经在技能墙中'); nameInput.reportValidity(); return;
    }
    nameInput.setCustomValidity('');
    skills.push({ name, level: levelInput.value }); save(); render();
    form.reset(); nameInput.focus();
  });
  nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
  render();
  window.addEventListener('load', () => setTimeout(() => { loading.style.opacity = '0'; }, 100));
})();
