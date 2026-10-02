// 프로젝트 줄에 마우스를 올리거나 키보드로 이동하면 오른쪽 카드의 화면과 설명을 바꿉니다.
const rows = document.querySelectorAll('.project-row');
const frame = document.querySelector('.preview-frame');
const previews = document.querySelectorAll('.preview-shot img');
const caption = {
  name: document.querySelector('.preview-name'),
  desc: document.querySelector('.preview-desc'),
  tech: document.querySelector('.preview-tech'),
};

const showPreview = (row) => {
  const index = Number(row.dataset.preview);
  rows.forEach((item) => item.classList.toggle('is-active', item === row));
  previews.forEach((image, i) => image.classList.toggle('is-active', i === index));
  frame.dataset.active = index;
  document.body.dataset.active = index;
  caption.name.textContent = row.querySelector('.project-name').textContent;
  caption.desc.textContent = row.querySelector('.project-desc').textContent;
  caption.tech.textContent = row.querySelector('.project-tech').textContent;
};

rows.forEach((row) => {
  row.addEventListener('mouseenter', () => showPreview(row));
  row.addEventListener('focus', () => showPreview(row));
});

if (rows.length && caption.name) {
  showPreview(rows[0]);
}
