
const Filter = ({ searchQuery, handleSearchQuery }) => {
  return (
    <>
      <label htmlFor="search">filter shown with: </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="xyz..."
        value={searchQuery}
        onChange={handleSearchQuery} />
    </>
  )
}

export default Filter