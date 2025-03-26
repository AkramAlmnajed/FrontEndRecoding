import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="w-96 h-72 relative">
      <div className="w-96 h-14 left-[1px] top-[233px] absolute opac
      ity-70 text-center justify-center text-black text-3xl font-light font-['Oswald'] tracking-wider">
        Reset my password
      </div>
      <div className="w-96 h-36 left-0 top-0 absolute opacity-70 justify-center">
        <span class="text-black text-7xl font-light font-['Oswald'] tracking-[3.40px]">
          Password Reset
          <br />
        </span>
        <span class="text-black text-opacity-70 text-xl font-light font-['Oswald'] tracking-wide">
          Provide the email address associated with your account to recover your
          password.
        </span>
      </div>
      <div className="w-96 h-1 left-0 top-[203px] absolute bg-black bg-opacity-20" />
      <img
        className="w-16 h-16 left-[0.90px] top-[139.12px] absolute opacity-40"
        src="https://placehold.co/64x64"
      />
      <div className="w-80 h-6 left-[79px] top-[157px] absolute opacity-50 justify-center text-black text-3xl font-light font-['Oswald'] tracking-wider">
        Email
      </div>
      <div className="w-96 h-14 left-[1px] top-[235px] absolute rounded-[100px] border border-cyan-600" />
    </div>
  );
}

export default App;
