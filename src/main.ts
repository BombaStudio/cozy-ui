var navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs/docs.html', label: 'Docs' },
  { href: '/examples/examples.html', label: 'Examples' }
  
];

navLinks.forEach(link => {
  document.querySelector<HTMLDivElement>('#navLinks')!.innerHTML += `
    <a href="${link.href}" class="navLink">${link.label}</a>
  `;
});