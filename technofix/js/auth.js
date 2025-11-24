// auth.js
// Utility: SHA-256 hex
async function sha256Hex(str){
  const enc = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', enc);
  const arr = Array.from(new Uint8Array(hash));
  return arr.map(b => b.toString(16).padStart(2,'0')).join('');
}

// get users array
function getUsers(){
  try{
    return JSON.parse(localStorage.getItem('tf_users') || '[]');
  }catch(e){ 
    return []; 
  }
}

function saveUsers(users){
  localStorage.setItem('tf_users', JSON.stringify(users));
}

// register: {name,email,password}
async function registerUser(name, email, password){
  if(!name || !email || !password) throw 'Semua field wajib diisi';

  const users = getUsers();

  if(users.find(u => u.email.toLowerCase() === email.toLowerCase()))
    throw 'Email sudah terdaftar';

  const hashed = await sha256Hex(password);

  users.push({
    name,
    email: email.toLowerCase(),
    pass: hashed,
    created: Date.now()
  });

  saveUsers(users);
  return true;
}

// login: returns user object (without pass) or throws
async function loginUser(email, password){
  if(!email || !password) throw 'Email dan password wajib diisi';

  const users = getUsers();
  const user = users.find(u => u.email === email.toLowerCase());

  if(!user) throw 'Akun tidak ditemukan';

  const hashed = await sha256Hex(password);

  if(hashed !== user.pass)
    throw 'Password salah';

  // save session
  const safe = { name: user.name, email: user.email };
  localStorage.setItem('tf_session', JSON.stringify(safe));

  // 🔥 AUTO: langsung masuk ke halaman utama
  window.location.href = 'index.html';

  return safe;
}

// logout
function logout(){
  localStorage.removeItem('tf_session');
  location.href = 'login.html';
}

// get session user
function getSession(){
  try{
    return JSON.parse(localStorage.getItem('tf_session') || 'null');
  }catch(e){
    return null;
  }
}

// helper: require auth on secure pages
function requireAuth(redirectTo='login.html'){
  const s = getSession();
  if(!s){
    location.href = redirectTo;
    return null;
  }
  return s;
}
