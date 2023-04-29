import { useAuth } from "../context/authContext";
import logo from "./../img/logo.png";

export function Home() {
  const {user} = useAuth();

  return (
    <div className="w-full flex px-10 py-20 m-auto rounded-3xl items-center justify-center ">
      <div className="bg-white m-auto px-10 py-20 rounded-3xl border-2 border-gray-100">
        <h2 className=" p-0.5">{user.email}</h2>
        <h2 className=" p-0.5">Es un placer tenerte de vuelta</h2>
        <img src={logo} className="" alt="logo" />
      </div>
    </div>
  );
}
