import DessertCount from "./_components/DessertCount";
import DrinksCount from "./_components/DrinksCount";

const ExampleOne = () => {
  return (
    <div className="bg-indigo-50 h-screen flex justify-center items-center">
      <div className="bg-sky-50 p-10 rounded-2xl shadow w-6/12">
        <h1 className="font-bold text-8xl text-neutral-600 my-5">
          Render Props Example One
        </h1>
        <p className="text-gray-600">
          Render props is also a powerful technique you can leverage to reuse
          common code. The render props technique is so appropriately named that
          it's almost self explanatory. It's about using a prop called render
          with a particular attribute that it has to be a function. To be more
          precise, a component with a render prop takes a function that returns
          a react element and calls that function inside its render logic
        </p>
        <div className="flex justify-around items-center rounded-2xl p-10 bg-orange-50 shadow my-3">
          <DessertCount />
          <DrinksCount />
        </div>
      </div>
    </div>
  );
};

export default ExampleOne;
