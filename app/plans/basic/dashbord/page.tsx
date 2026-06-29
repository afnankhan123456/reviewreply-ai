{/* 3 BIG CARDS */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">

  {/* Rating Overview */}
  <div className="bg-white rounded-[24px] h-[220px] border border-[#e5e7eb] shadow-sm p-5">

    <div className="flex items-center justify-between">
      <h3 className="text-[17px] font-semibold text-[#111827]">
        Rating Overview
      </h3>

      <button className="text-[13px] font-medium text-blue-600">
        View All
      </button>
    </div>

    <div className="flex items-center justify-between mt-6">

      <div className="w-[120px] h-[120px] rounded-full border-[10px] border-orange-400 flex flex-col items-center justify-center">
        <h2 className="text-[30px] font-bold text-[#111827]">
          128
        </h2>

        <p className="text-[11px] text-[#6b7280]">
          Total Reviews
        </p>
      </div>

      <div className="flex flex-col gap-3 w-[140px]">

        {[5,4,3,2,1].map((star, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >

            <span className="text-[12px] font-medium text-[#111827] w-3">
              {star}
            </span>

            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  star === 5
                    ? "w-[80%] bg-green-500"
                    : star === 4
                    ? "w-[55%] bg-green-400"
                    : star === 3
                    ? "w-[30%] bg-yellow-400"
                    : star === 2
                    ? "w-[18%] bg-orange-400"
                    : "w-[10%] bg-red-400"
                }`}
              />
            </div>

            <span className="text-[11px] text-[#6b7280]">
              {star === 5
                ? "62%"
                : star === 4
                ? "23%"
                : star === 3
                ? "8%"
                : star === 2
                ? "4%"
                : "3%"}
            </span>

          </div>
        ))}

      </div>

    </div>

  </div>

  {/* Low Rating Alerts */}
  <div className="bg-white rounded-[24px] h-[220px] border border-[#e5e7eb] shadow-sm p-5">

    <div className="flex items-center justify-between">
      <h3 className="text-[17px] font-semibold text-[#111827]">
        Low Rating Alerts
      </h3>

      <button className="text-[13px] font-medium text-blue-600">
        View All
      </button>
    </div>

    <div className="flex flex-col gap-5 mt-6">

      {[1,2,3].map((item) => (
        <div
          key={item}
          className="flex items-start justify-between"
        >

          <div className="flex gap-3">

            <div className="w-8 h-8 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center">
              <span className="text-[12px] font-bold text-[#4285F4]">
                G
              </span>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-[#111827]">
                John Doe
              </h4>

              <p className="text-[12px] text-[#6b7280] mt-1">
                Need improvement.
              </p>
            </div>

          </div>

          <div className="flex flex-col items-end gap-1">

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
            </div>

            <span className="text-[11px] text-[#6b7280]">
              2h ago
            </span>

          </div>

        </div>
      ))}

    </div>

  </div>

  {/* Unanswered Reviews */}
  <div className="bg-white rounded-[24px] h-[220px] border border-[#e5e7eb] shadow-sm p-5">

    <div className="flex items-center justify-between">
      <h3 className="text-[17px] font-semibold text-[#111827]">
        Unanswered Reviews
      </h3>

      <button className="text-[13px] font-medium text-blue-600">
        View All
      </button>
    </div>

    <div className="flex flex-col gap-5 mt-6">

      {[1,2,3].map((item) => (
        <div
          key={item}
          className="flex items-start justify-between"
        >

          <div className="flex gap-3">

            <div className="w-8 h-8 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center">
              <span className="text-[12px] font-bold text-[#4285F4]">
                G
              </span>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-[#111827]">
                Emily Davis
              </h4>

              <p className="text-[12px] text-[#6b7280] mt-1">
                Please improve your service.
              </p>
            </div>

          </div>

          <div className="flex flex-col items-end gap-1">

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
            </div>

            <span className="text-[11px] text-[#6b7280]">
              3h ago
            </span>

          </div>

        </div>
      ))}

    </div>

  </div>

</div>
