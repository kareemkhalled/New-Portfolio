// جيب بيانات الـ about
function initials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function observeReveal(el) {
  if (window.__revealObserver) {
    window.__revealObserver.observe(el);
  } else {
    el.classList.add('is-visible');
  }
}

async function loadAbout() {
  const container = document.getElementById('about-container');
  try {
    const res = await fetch('/api/about');
    const about = await res.json();

    if (!about) {
      container.innerHTML = '<p class="loading">No about info yet.</p>';
      return;
    }

    container.innerHTML = `
      <div class="about-header">
        <div class="about-avatar">${initials(about.name) || 'K'}</div>
        <div>
          <h3>${about.name || ''}</h3>
          <p class="about-title">${about.title || ''}</p>
        </div>
      </div>
      <p class="about-bio">${about.bio || ''}</p>
      ${about.email ? `
        <a class="about-email" href="mailto:${about.email}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 6L2 7"></path></svg>
          ${about.email}
        </a>` : ''}
    `;

    if (about.title) {
      const roleEl = document.getElementById('hero-role');
      if (roleEl) roleEl.textContent = about.title;
    }

    if (about.email) {
      const contactEmail = document.getElementById('contact-email');
      if (contactEmail) contactEmail.setAttribute('href', `mailto:${about.email}`);
    }
  } catch (err) {
    container.innerHTML = '<p class="loading">Failed to load about.</p>';
    console.error(err);
  }
}

// حوّل مستوى المهارة لنسبة مئوية للـ progress bar
function levelToPercent(level) {
  if (!level) return 65;
  const numeric = parseInt(level, 10);
  if (!Number.isNaN(numeric) && String(numeric) === level.trim().replace('%', '')) {
    return Math.min(100, Math.max(5, numeric));
  }
  const map = {
    beginner: 35,
    basic: 35,
    intermediate: 60,
    advanced: 85,
    expert: 100,
    master: 100,
  };
  return map[level.toLowerCase().trim()] || 70;
}

// جيب الـ skills
async function loadSkills() {
  const container = document.getElementById('skills-container');
  try {
    const res = await fetch('/api/skills');
    const skills = await res.json();

    if (skills.length === 0) {
      container.innerHTML = '<p class="loading">No skills yet.</p>';
      return;
    }

    container.innerHTML = '';
    skills.forEach((skill) => {
      const percent = levelToPercent(skill.level);
      const badge = document.createElement('div');
      badge.className = 'skill-badge';
      badge.style.setProperty('--fill', `${percent}%`);
      badge.innerHTML = `
        <div class="skill-badge-top">
          <span class="skill-name">${skill.name}</span>
          ${skill.level ? `<span class="skill-level">${skill.level}</span>` : ''}
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill"></div>
        </div>
      `;
      container.appendChild(badge);
      observeReveal(badge);
    });
  } catch (err) {
    container.innerHTML = '<p class="loading">Failed to load skills.</p>';
    console.error(err);
  }
}

// جيب المشاريع
async function loadProjects() {
  const container = document.getElementById('projects-container');
  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();

    if (projects.length === 0) {
      container.innerHTML = '<p class="loading">No projects yet.</p>';
      return;
    }

    container.innerHTML = '';
    projects.forEach((project, i) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.style.setProperty('--i', i);

      const tech = (project.technologies || [])
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join('');

      const links = `
        ${project.githubUrl ? `
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>
            Code
          </a>` : ''}
        ${project.liveUrl ? `
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path></svg>
            Live Demo
          </a>` : ''}
      `;

      card.innerHTML = `
        ${project.imageUrl ? `
          <div class="project-img-wrap">
            <img src="${project.imageUrl}" alt="${project.title}" class="project-img" loading="lazy" />
          </div>` : ''}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-list">${tech}</div>
        ${links.trim() ? `<div class="project-links">${links}</div>` : ''}
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p class="loading">Failed to load projects.</p>';
    console.error(err);
  }
}

// شغّل الكل
loadAbout();
loadSkills();
loadProjects();
