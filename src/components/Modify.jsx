import { useEffect, useState } from 'react'
import Sort from './Sort'
import Card from './Card'

const Modify = ({ occasions, toggle, setToggle, setOccasion }) => {
  const [sortedOccasions, setSortedOccasions] = useState([])

  useEffect(() => {
    setSortedOccasions(occasions)
  }, [occasions])

  const handleSort = (type) => {
    let sorted = [...occasions]

    if (type === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (type === "rate") {
      sorted.sort(
        (a, b) =>
          parseFloat(a.cost.toString()) - parseFloat(b.cost.toString())
      )
    }

    setSortedOccasions(sorted)
  }

  return (
    <div className="px-6 py-4">
      {/* Sort Filter */}
      <Sort onSort={handleSort} />

      {/* Column Header */}
      <div className="grid grid-cols-4 gap-4 font-semibold px-4 py-2 bg-gray-200 text-sm mt-4 rounded">
        
      </div>

      {/* Cards List */}
      <div className="mt-2">
        {sortedOccasions.length > 0 ? (
          sortedOccasions.map((occasion, index) => (
            <Card
              key={index}
              occasion={occasion}
              toggle={toggle}
              setToggle={setToggle}
              setOccasion={setOccasion}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No events to display.</p>
        )}
      </div>
    </div>
  )
}

export default Modify
