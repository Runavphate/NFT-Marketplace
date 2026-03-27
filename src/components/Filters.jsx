const Filters = () => (
  <div className="flex gap-4 flex-wrap">
    <select className="px-4 py-2 border rounded bg-white shadow">
      <option>All Categories</option>
      <option>Apes</option>
      <option>Collectibles</option>
      <option>Space</option>
    </select>
    <select className="px-4 py-2 border rounded bg-white shadow">
      <option>Sort by Price</option>
      <option>Lowest First</option>
      <option>Highest First</option>
    </select>
  </div>
);

export default Filters;
