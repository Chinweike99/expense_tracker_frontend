import  RegisterPage  from "./(auth)/register/page";
import LandingPage from "./(marketing)/page";

export default function Home (){
  return(
    <div className="text-2xl">
      {/* <RegisterPage /> */}
      <LandingPage />
    </div>
  )
}