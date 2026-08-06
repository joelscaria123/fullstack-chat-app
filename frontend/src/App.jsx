import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import './App.css';


function App() {
  
  return (
    <div>
      <header>
        <Show when="signed-out">
          <SignInButton mode='modal'/>
          <SignUpButton mode='modal'/>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  )
}

export default App
