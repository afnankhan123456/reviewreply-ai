<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; }
  </style>
</head>
<body class="min-h-screen bg-white p-5 lg:p-7">

  <!-- Dummy Topbar -->
  <div class="h-14 bg-white rounded-2xl shadow-sm flex items-center px-6 border mb-5">
    <span class="font-semibold text-gray-700">Dashboard</span>
  </div>

  <!-- TOP 4 CARDS - 80px height -->
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">
    <!-- Card 1 -->
    <div class="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
      <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
        <i data-lucide="message-square" class="w-5 h-5 text-blue-600"></i>
      </div>
      <div class="flex flex-col gap-0.5 min-w-0">
        <p class="text-[11px] text-[#6b7280] leading-tight">Reviews Synced</p>
        <div class="flex items-baseline gap-1">
          <h3 class="text-[22px] font-bold text-[#111827] leading-none">100</h3>
          <span class="text-[13px] text-[#6b7280]">/100</span>
        </div>
        <p class="text-[10px] text-[#6b7280] leading-tight">This Month</p>
      </div>
    </div>
    <!-- Card 2 -->
    <div class="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
      <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
        <i data-lucide="refresh-cw" class="w-5 h-5 text-green-600"></i>
      </div>
      <div class="flex flex-col gap-0.5 min-w-0">
        <p class="text-[11px] text-[#6b7280] leading-tight">Google Review Sync</p>
        <h3 class="text-[22px] font-bold text-green-600 leading-none">Active</h3>
        <p class="text-[10px] text-[#6b7280] leading-tight">Last synced 2 hours ago</p>
      </div>
    </div>
    <!-- Card 3 -->
    <div class="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
      <div class="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
        <i data-lucide="star" class="w-5 h-5 fill-yellow-500 text-yellow-500"></i>
      </div>
      <div class="flex flex-col gap-0.5 min-w-0">
        <p class="text-[11px] text-[#6b7280] leading-tight">Average Rating</p>
        <div class="flex items-center gap-2">
          <h3 class="text-[22px] font-bold text-[#111827] leading-none">4.6</h3>
          <div class="flex gap-0.5">
            <svg class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg class="w-3.5 h-3.5 text-gray-300" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>
        <p class="text-[10px] text-[#6b7280] leading-tight">Based on 128 reviews</p>
      </div>
    </div>
    <!-- Card 4 -->
    <div class="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
      <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
        <i data-lucide="trending-up" class="w-5 h-5 text-purple-600"></i>
      </div>
      <div class="flex flex-col gap-0.5 min-w-0">
        <p class="text-[11px] text-[#6b7280] leading-tight">Response Rate</p>
        <h3 class="text-[22px] font-bold text-[#111827] leading-none">85%</h3>
        <p class="text-[10px] text-green-600 leading-tight font-medium">Good response rate</p>
      </div>
    </div>
  </div>

  <!-- 8 SMALL CARDS - height 80px -->
  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mt-6" id="feature-grid"></div>

  <!-- 3 BIG CARDS -->
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
    <div class="bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]"></div>
    <div class="bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]"></div>
    <div class="bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]"></div>
  </div>

  <!-- 1 BIG + 2 SMALL -->
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
    <div class="xl:col-span-2 bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]"></div>
    <div class="flex flex-col gap-6 h-[360px]">
      <div class="bg-white rounded-[24px] h-[170px] border border-[#e5e7eb]"></div>
      <div class="bg-white rounded-[24px] h-[170px] border border-[#e5e7eb]"></div>
    </div>
  </div>

  <!-- LAST 3 CARDS -->
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7 pb-8">
    <div class="bg-white rounded-[24px] h-[340px] border border-[#e5e7eb]"></div>
    <div class="bg-white rounded-[24px] h-[340px] border border-[#e5e7eb]"></div>
    <div class="bg-white rounded-[24px] h-[340px] border border-[#e5e7eb]"></div>
  </div>

  <script>
    lucide.createIcons();

    const features = [
      { title: "Low Rating Alerts", icon: "alert-triangle", color: "bg-red-100 text-red-500" },
      { title: "Unanswered Tracking", icon: "message-square", color: "bg-pink-100 text-pink-500" },
      { title: "Reply Templates", icon: "reply", color: "bg-violet-100 text-violet-500" },
      { title: "Response Tracking", icon: "refresh-cw", color: "bg-cyan-100 text-cyan-500" },
      { title: "Email Alerts", icon: "mail", color: "bg-yellow-100 text-yellow-600" },
      { title: "Top 5 Keywords", icon: "hash", color: "bg-orange-100 text-orange-500" },
      { title: "Monthly PDF Reports", icon: "file-text", color: "bg-green-100 text-green-600" },
      { title: "Export CSV / PDF", icon: "download", color: "bg-blue-100 text-blue-600" }
    ];

    const grid = document.getElementById('feature-grid');
    features.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white border border-[#e5e7eb] rounded-[22px] h-[80px] px-4 py-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between';
      card.innerHTML = `
        <div class="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center ${item.color}">
          <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        </div>
        <p class="text-[13px] font-semibold text-[#111827] leading-5 mt-3">${item.title}</p>
      `;
      grid.appendChild(card);
    });
    lucide.createIcons(); // re-init for dynamic icons
  </script>
</body>
</html>
