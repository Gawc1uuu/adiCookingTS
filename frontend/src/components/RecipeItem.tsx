import recipe from "../interfaces/recipe";

interface RecipeItemProps {
  data: recipe;
}

const RecipeItem = ({ data }: RecipeItemProps) => {
  return (
    <div className="bg-slate-200 rounded-lg shadow px-6 py-4 space-y-4 transition hover:-translate-y-1 w-[90%] md:w-[30%]">
      <h3 className="text-2xl text-pink-300 text-center font-semibold tracking-wider text-gray-800">
        {data.title}
      </h3>
      <p className="text-md leading-6 text-gray-500 text-center">
        {data.method.substring(0, 80)}...
      </p>
      <p className="text-xs text-gray-400 text-center">
        {data.cookingTime} minutes to prepare
      </p>
      <div className="text-center">
        <button className="px-8 py-2 rounded-full bg-slate-300 font-semibold text-sm text-slate-500 hover:bg-slate-400">
          Cook this
        </button>
      </div>
    </div>
  );
};

export default RecipeItem;
