interface ITopicProps {
  name: string;
}

export default function Topic({ name }: ITopicProps) {
  // -- [PARAMS] --

  // -- [FUNCTIONS] --

  // -- [HOOKS] --
  return (
    <div className="text-sm font-medium text-gray-500 border py-1.5 px-3 rounded-lg">
      {name}
    </div>
  );
}
