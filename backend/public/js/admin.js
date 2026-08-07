// ===== عناصر فورم المشاريع =====
const addBtn = document.getElementById('add-project-btn');
const msg = document.getElementById('project-msg');
const cancelBtn = document.getElementById('cancel-edit-btn');
const formTitle = document.getElementById('project-form-title');
const editIdField = document.getElementById('p-edit-id');

// ===== إضافة / تعديل مشروع =====
addBtn.addEventListener('click', async () => {
  const project = {
    title: document.getElementById('p-title').value.trim(),
    description: document.getElementById('p-description').value.trim(),
    technologies: document
      .getElementById('p-tech')
      .value.split(',')
      .map((t) => t.trim())
      .filter((t) => t),
    githubUrl: document.getElementById('p-github').value.trim(),
    liveUrl: document.getElementById('p-live').value.trim(),
  };

  if (!project.title || !project.description) {
    showMsg('Title and description are required.', true);
    return;
  }

  // لو فيه صورة مختارة، ارفعها الأول وخُد الرابط
  const imageFile = document.getElementById('p-image').files[0];
  if (imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,        // مفيش Content-Type — المتصفح بيحطه لوحده
      });

      if (!uploadRes.ok) throw new Error('Upload failed');
      const uploadData = await uploadRes.json();
      project.imageUrl = uploadData.imageUrl;
    } catch (err) {
      showMsg('Error uploading image.', true);
      console.error(err);
      return;
    }
  }

  const editId = editIdField.value;   // فاضي = إضافة، فيه id = تعديل

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/projects/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
    } else {
      res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
    }

    if (!res.ok) throw new Error('Failed');

    showMsg(editId ? 'Project updated ✅' : 'Project added ✅', false);
    resetProjectForm();
    loadProjects();
  } catch (err) {
    showMsg('Error saving project.', true);
    console.error(err);
  }
});

// زرار الإلغاء
cancelBtn.addEventListener('click', resetProjectForm);

// رجّع الفورم لوضع الإضافة
function resetProjectForm() {
  clearForm();
  editIdField.value = '';
  formTitle.textContent = 'Add Project';
  addBtn.textContent = 'Add Project';
  cancelBtn.style.display = 'none';
  document.getElementById('p-image').value = '';   // فرّغ حقل الصورة
}

// حمّل مشروع في الفورم للتعديل
async function editProject(id) {
  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    const project = projects.find((p) => p._id === id);
    if (!project) return;

    document.getElementById('p-title').value = project.title || '';
    document.getElementById('p-description').value = project.description || '';
    document.getElementById('p-tech').value = (project.technologies || []).join(', ');
    document.getElementById('p-github').value = project.githubUrl || '';
    document.getElementById('p-live').value = project.liveUrl || '';
    editIdField.value = project._id;

    formTitle.textContent = 'Edit Project';
    addBtn.textContent = 'Update Project';
    cancelBtn.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error(err);
  }
}

// ===== عرض المشاريع =====
async function loadProjects() {
  const list = document.getElementById('projects-list');
  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();

    if (projects.length === 0) {
      list.innerHTML = '<p class="loading">No projects yet.</p>';
      return;
    }

    list.innerHTML = '';
    projects.forEach((project) => {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <div class="item-info">
          <h4>${project.title}</h4>
          <p>${project.description}</p>
        </div>
        <div class="item-actions">
          <button class="edit-btn" data-id="${project._id}">Edit</button>
          <button class="delete-btn" data-id="${project._id}">Delete</button>
        </div>
      `;
      list.appendChild(item);
    });

    document.querySelectorAll('#projects-list .edit-btn').forEach((btn) => {
      btn.addEventListener('click', () => editProject(btn.dataset.id));
    });
    document.querySelectorAll('#projects-list .delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => deleteProject(btn.dataset.id));
    });
  } catch (err) {
    list.innerHTML = '<p class="loading">Failed to load.</p>';
    console.error(err);
  }
}

// ===== مسح مشروع =====
async function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  try {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    loadProjects();
  } catch (err) {
    console.error(err);
  }
}

// ===== دوال مساعدة للمشاريع =====
function showMsg(text, isError) {
  msg.textContent = text;
  msg.className = isError ? 'msg error' : 'msg';
}

function clearForm() {
  ['p-title', 'p-description', 'p-tech', 'p-github', 'p-live'].forEach((id) => {
    document.getElementById(id).value = '';
  });
}

// ===== الـ About =====
const saveAboutBtn = document.getElementById('save-about-btn');
const aboutMsg = document.getElementById('about-msg');

async function loadAboutForm() {
  try {
    const res = await fetch('/api/about');
    const about = await res.json();
    if (!about) return;
    document.getElementById('a-name').value = about.name || '';
    document.getElementById('a-title').value = about.title || '';
    document.getElementById('a-bio').value = about.bio || '';
    document.getElementById('a-email').value = about.email || '';
  } catch (err) {
    console.error(err);
  }
}

saveAboutBtn.addEventListener('click', async () => {
  const about = {
    name: document.getElementById('a-name').value.trim(),
    title: document.getElementById('a-title').value.trim(),
    bio: document.getElementById('a-bio').value.trim(),
    email: document.getElementById('a-email').value.trim(),
  };

  if (!about.name) {
    aboutMsg.textContent = 'Name is required.';
    aboutMsg.className = 'msg error';
    return;
  }

  try {
    const res = await fetch('/api/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(about),
    });
    if (!res.ok) throw new Error('Failed');
    aboutMsg.textContent = 'About saved ✅';
    aboutMsg.className = 'msg';
  } catch (err) {
    aboutMsg.textContent = 'Error saving about.';
    aboutMsg.className = 'msg error';
    console.error(err);
  }
});

// ===== الـ Skills =====
const addSkillBtn = document.getElementById('add-skill-btn');
const skillMsg = document.getElementById('skill-msg');

addSkillBtn.addEventListener('click', async () => {
  const skill = {
    name: document.getElementById('s-name').value.trim(),
    level: document.getElementById('s-level').value.trim(),
    category: document.getElementById('s-category').value.trim(),
  };

  if (!skill.name) {
    skillMsg.textContent = 'Skill name is required.';
    skillMsg.className = 'msg error';
    return;
  }

  try {
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
    if (!res.ok) throw new Error('Failed');
    skillMsg.textContent = 'Skill added ✅';
    skillMsg.className = 'msg';
    document.getElementById('s-name').value = '';
    document.getElementById('s-level').value = '';
    document.getElementById('s-category').value = '';
    loadSkills();
  } catch (err) {
    skillMsg.textContent = 'Error adding skill.';
    skillMsg.className = 'msg error';
    console.error(err);
  }
});

async function loadSkills() {
  const list = document.getElementById('skills-list');
  try {
    const res = await fetch('/api/skills');
    const skills = await res.json();

    if (skills.length === 0) {
      list.innerHTML = '<p class="loading">No skills yet.</p>';
      return;
    }

    list.innerHTML = '';
    skills.forEach((skill) => {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <div class="item-info">
          <h4>${skill.name}</h4>
          <p>${skill.level || ''} ${skill.category ? '· ' + skill.category : ''}</p>
        </div>
        <button class="delete-btn" data-id="${skill._id}">Delete</button>
      `;
      list.appendChild(item);
    });

    document.querySelectorAll('#skills-list .delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => deleteSkill(btn.dataset.id));
    });
  } catch (err) {
    list.innerHTML = '<p class="loading">Failed to load.</p>';
    console.error(err);
  }
}

async function deleteSkill(id) {
  if (!confirm('Delete this skill?')) return;
  try {
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed');
    loadSkills();
  } catch (err) {
    console.error(err);
  }
}

// ===== الـ Experience =====
const addExperienceBtn = document.getElementById('add-experience-btn');
const experienceMsg = document.getElementById('experience-msg');
const cancelExperienceBtn = document.getElementById('cancel-edit-experience-btn');
const experienceFormTitle = document.getElementById('experience-form-title');
const experienceEditIdField = document.getElementById('x-edit-id');

addExperienceBtn.addEventListener('click', async () => {
  const experience = {
    role: document.getElementById('x-role').value.trim(),
    company: document.getElementById('x-company').value.trim(),
    location: document.getElementById('x-location').value.trim(),
    period: document.getElementById('x-period').value.trim(),
    bullets: document
      .getElementById('x-bullets')
      .value.split('\n')
      .map((b) => b.trim())
      .filter((b) => b),
    technologies: document
      .getElementById('x-tech')
      .value.split(',')
      .map((t) => t.trim())
      .filter((t) => t),
  };

  if (!experience.role) {
    experienceMsg.textContent = 'Role is required.';
    experienceMsg.className = 'msg error';
    return;
  }

  const editId = experienceEditIdField.value;

  try {
    const res = await fetch(editId ? `/api/experience/${editId}` : '/api/experience', {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experience),
    });
    if (!res.ok) throw new Error('Failed');

    experienceMsg.textContent = editId ? 'Experience updated ✅' : 'Experience added ✅';
    experienceMsg.className = 'msg';
    resetExperienceForm();
    loadExperience();
  } catch (err) {
    experienceMsg.textContent = 'Error saving experience.';
    experienceMsg.className = 'msg error';
    console.error(err);
  }
});

cancelExperienceBtn.addEventListener('click', resetExperienceForm);

function resetExperienceForm() {
  ['x-role', 'x-company', 'x-location', 'x-period', 'x-bullets', 'x-tech'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  experienceEditIdField.value = '';
  experienceFormTitle.textContent = 'Add Experience';
  addExperienceBtn.textContent = 'Add Experience';
  cancelExperienceBtn.style.display = 'none';
}

async function editExperience(id) {
  try {
    const res = await fetch('/api/experience');
    const items = await res.json();
    const item = items.find((i) => i._id === id);
    if (!item) return;

    document.getElementById('x-role').value = item.role || '';
    document.getElementById('x-company').value = item.company || '';
    document.getElementById('x-location').value = item.location || '';
    document.getElementById('x-period').value = item.period || '';
    document.getElementById('x-bullets').value = (item.bullets || []).join('\n');
    document.getElementById('x-tech').value = (item.technologies || []).join(', ');
    experienceEditIdField.value = item._id;

    experienceFormTitle.textContent = 'Edit Experience';
    addExperienceBtn.textContent = 'Update Experience';
    cancelExperienceBtn.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error(err);
  }
}

async function loadExperience() {
  const list = document.getElementById('experience-list');
  try {
    const res = await fetch('/api/experience');
    const items = await res.json();

    if (items.length === 0) {
      list.innerHTML = '<p class="loading">No experience yet.</p>';
      return;
    }

    list.innerHTML = '';
    items.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
        <div class="item-info">
          <h4>${item.role}</h4>
          <p>${item.company || ''}${item.period ? ' · ' + item.period : ''}</p>
        </div>
        <div class="item-actions">
          <button class="edit-btn" data-id="${item._id}">Edit</button>
          <button class="delete-btn" data-id="${item._id}">Delete</button>
        </div>
      `;
      list.appendChild(el);
    });

    document.querySelectorAll('#experience-list .edit-btn').forEach((btn) => {
      btn.addEventListener('click', () => editExperience(btn.dataset.id));
    });
    document.querySelectorAll('#experience-list .delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => deleteExperience(btn.dataset.id));
    });
  } catch (err) {
    list.innerHTML = '<p class="loading">Failed to load.</p>';
    console.error(err);
  }
}

async function deleteExperience(id) {
  if (!confirm('Delete this experience entry?')) return;
  try {
    const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed');
    loadExperience();
  } catch (err) {
    console.error(err);
  }
}

// ===== الـ Education =====
const addEducationBtn = document.getElementById('add-education-btn');
const educationMsg = document.getElementById('education-msg');
const cancelEducationBtn = document.getElementById('cancel-edit-education-btn');
const educationFormTitle = document.getElementById('education-form-title');
const educationEditIdField = document.getElementById('e-edit-id');

addEducationBtn.addEventListener('click', async () => {
  const education = {
    title: document.getElementById('e-title').value.trim(),
    institution: document.getElementById('e-institution').value.trim(),
    description: document.getElementById('e-description').value.trim(),
    period: document.getElementById('e-period').value.trim(),
  };

  if (!education.title) {
    educationMsg.textContent = 'Title is required.';
    educationMsg.className = 'msg error';
    return;
  }

  const editId = educationEditIdField.value;

  try {
    const res = await fetch(editId ? `/api/education/${editId}` : '/api/education', {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(education),
    });
    if (!res.ok) throw new Error('Failed');

    educationMsg.textContent = editId ? 'Education updated ✅' : 'Education added ✅';
    educationMsg.className = 'msg';
    resetEducationForm();
    loadEducation();
  } catch (err) {
    educationMsg.textContent = 'Error saving education.';
    educationMsg.className = 'msg error';
    console.error(err);
  }
});

cancelEducationBtn.addEventListener('click', resetEducationForm);

function resetEducationForm() {
  ['e-title', 'e-institution', 'e-description', 'e-period'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  educationEditIdField.value = '';
  educationFormTitle.textContent = 'Add Education';
  addEducationBtn.textContent = 'Add Education';
  cancelEducationBtn.style.display = 'none';
}

async function editEducation(id) {
  try {
    const res = await fetch('/api/education');
    const items = await res.json();
    const item = items.find((i) => i._id === id);
    if (!item) return;

    document.getElementById('e-title').value = item.title || '';
    document.getElementById('e-institution').value = item.institution || '';
    document.getElementById('e-description').value = item.description || '';
    document.getElementById('e-period').value = item.period || '';
    educationEditIdField.value = item._id;

    educationFormTitle.textContent = 'Edit Education';
    addEducationBtn.textContent = 'Update Education';
    cancelEducationBtn.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error(err);
  }
}

async function loadEducation() {
  const list = document.getElementById('education-list');
  try {
    const res = await fetch('/api/education');
    const items = await res.json();

    if (items.length === 0) {
      list.innerHTML = '<p class="loading">No education yet.</p>';
      return;
    }

    list.innerHTML = '';
    items.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
        <div class="item-info">
          <h4>${item.title}</h4>
          <p>${item.institution || ''}${item.period ? ' · ' + item.period : ''}</p>
        </div>
        <div class="item-actions">
          <button class="edit-btn" data-id="${item._id}">Edit</button>
          <button class="delete-btn" data-id="${item._id}">Delete</button>
        </div>
      `;
      list.appendChild(el);
    });

    document.querySelectorAll('#education-list .edit-btn').forEach((btn) => {
      btn.addEventListener('click', () => editEducation(btn.dataset.id));
    });
    document.querySelectorAll('#education-list .delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => deleteEducation(btn.dataset.id));
    });
  } catch (err) {
    list.innerHTML = '<p class="loading">Failed to load.</p>';
    console.error(err);
  }
}

async function deleteEducation(id) {
  if (!confirm('Delete this education entry?')) return;
  try {
    const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed');
    loadEducation();
  } catch (err) {
    console.error(err);
  }
}

// ===== شغّل أول تحميل =====
loadProjects();
loadSkills();
loadAboutForm();
loadExperience();
loadEducation();