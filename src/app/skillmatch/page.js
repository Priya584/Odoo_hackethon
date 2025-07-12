import Navbar from "@/components/Navbar";
const dummyUsers = [
  {
    name: "Marc Demo",
    rating: 3.9,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Designer"],
  },
  {
    name: "Michell",
    rating: 2.5,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Designer"],
  },
  {
    name: "Joe Wills",
    rating: 4.0,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Designer"],
  },
];

export default function SkillMatch() {
  return (
    <div className="min-h-screen bg-[#F5EFEB]">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <select className="border border-[#C8D9E6] bg-white px-4 py-2 rounded shadow-sm text-[#2F4156]">
            <option>Availability</option>
            <option>Weekends</option>
            <option>Evenings</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search skills..."
              className="border border-[#C8D9E6] px-4 py-2 rounded w-64 shadow-sm"
            />
            <button className="bg-[#2F4156] text-white px-4 py-2 rounded hover:bg-[#567C8D]">
              Search
            </button>
          </div>
        </div>

        {dummyUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md mb-6 border border-[#C8D9E6] flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#C8D9E6] flex items-center justify-center text-white font-bold">

                P
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#2F4156]">{user.name}</h2>
                <div className="mt-2">
                  <p className="text-[#2F4156] font-medium">
                    Skills Offered:{" "}
                    {user.skillsOffered.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-block bg-[#C8D9E6] text-[#2F4156] px-2 py-1 text-sm rounded-full mr-2 mt-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </p>
                  <p className="text-[#2F4156] font-medium mt-1">
                    Skills Wanted:{" "}
                    {user.skillsWanted.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-block bg-[#F5EFEB] border border-[#567C8D] text-[#2F4156] px-2 py-1 text-sm rounded-full mr-2 mt-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[#2F4156] text-sm mb-2">Rating: {user.rating}/5</p>
              <button className="bg-[#567C8D] text-white px-4 py-2 rounded hover:bg-[#2F4156] transition">
                Request
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center space-x-2 mt-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className="w-8 h-8 rounded-full bg-white text-[#2F4156] hover:bg-[#C8D9E6] border border-[#C8D9E6] shadow-sm"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
