console.log('script js');

const signInBtn = document.getElementById('signInBtn');
signInBtn?.addEventListener('click', handleSignIn);

const signUpBtn = document.getElementById('signUpBtn');
signUpBtn?.addEventListener('click', handleSignUp);

async function handleSignIn(e) {
  e.preventDefault();
  try{
    const userEmail = document.querySelector("input[type='email']")?.value;
    const userPassword = document.querySelector("input[type='password']")?.value;
  
    const payload = {
      email: userEmail,
      password: userPassword
    }
    
    const response = await axios.post('/signin', payload);
    

  }
  catch(err) {
    console.log('err -> ', err);
  }

}

async function handleSignUp(e) {
  try{
    console.log('handleSignUp()...');
    e.preventDefault();
    const name = document.querySelector("input[type='text']")?.value;
    const age = document.querySelector("input[type='number']")?.value;
    const email = document.querySelector("input[type='email']")?.value;
    const password = document.querySelector("input[name='password']")?.value;
    const confirmPassword = document.querySelector("input[name='confirmPassword']")?.value;
  
    const response = await axios.post('/signup', {
        name,
        age,
        email,
        password,
        confirmPassword,
    })
    // console.log('response --> ', response);
  }
  catch(err) {
    console.log('wejs --> ', err);
  }
}