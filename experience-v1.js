(() => {
  const sections = [
    ['problem', 'The gap'], ['guide', 'Proof'], ['plan', 'Process'],
    ['checks', 'Findings'], ['outcome', 'Outcome'], ['finalCta', 'Next step']
  ];
  const site = document.querySelector('.site');
  if (!site) return;
  site.classList.add('enhanced');

  const rail = document.createElement('nav');
  rail.className = 'journeyRail';
  rail.setAttribute('aria-label', 'Page journey');
  sections.forEach(([name, label], index) => {
    const section = document.querySelector('.' + name);
    if (!section) return;
    const id = name === 'finalCta' ? 'next-step' : name;
    section.id = section.id || id;
    section.classList.add('chapter');
    const link = document.createElement('a');
    link.href = '#' + section.id;
    link.dataset.target = section.id;
    link.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b><span>${label}</span>`;
    rail.appendChild(link);
  });
  site.appendChild(rail);

  const hero = document.querySelector('.hero');
  if (hero) {
    const bar = document.createElement('section');
    bar.className = 'experienceBar';
    bar.innerHTML = `<div><b>20 min</b><span>First conversation</span></div><div><b>4 weeks</b><span>Evidence-led diagnostic</span></div><div><b>100%</b><span>Findings are yours</span></div><div><b>0</b><span>Software changes</span></div>`;
    hero.insertAdjacentElement('afterend', bar);
  }

  const booking = document.createElement('a');
  booking.className = 'stickyBooking';
  booking.href = 'https://book.spc3mail.com/mr_upadhyay';
  booking.innerHTML = `<span>Talk to Nitin</span><b>Book 20 minutes</b>`;
  document.body.appendChild(booking);

  const links = [...rail.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.dataset.target === entry.target.id));
      entry.target.classList.add('inView');
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('.chapter').forEach(section => observer.observe(section));

  document.querySelectorAll('.steps article, .checkGrid article').forEach(card => {
    card.tabIndex = 0;
    const activate = () => {
      [...card.parentElement.children].forEach(item => item.classList.remove('selected'));
      card.classList.add('selected');
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
    });
  });
})();
