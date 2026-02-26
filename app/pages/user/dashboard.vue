<template>
  <div class="min-h-screen bg-slate-50 py-4">
    <ContainerUser>
      <div class="grid grid-cols-12 gap-8">

        <!-- ================= LEFT SIDEBAR ================= -->
        <aside class="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6">

          <!-- Profile Card -->
          <div class="bg-white rounded-2xl shadow-sm p-6 text-center">
            <img
              src="/image/profile.webp"
              class="w-24 h-24 mx-auto rounded-full object-cover shadow"
            />

            <h3 class="mt-4 font-semibold text-lg">Habeeb</h3>
            <p class="text-sm text-gray-500">@habeeb1112</p>

               <div class=" flex justify-center items-center">
                 <button  class=" border border-slate-300 duration-300  rounded-md font-medium hover:bg-primary/10  text-sm   w-full   mt-3 py-2">View Profile</button>
              </div>
          </div>


          <!-- Stats Card -->
          <div class="bg-white hidden rounded-2xl shadow-sm p-6 space-y-4">

            <h4 class="font-semibold text-gray-700">Overview</h4>

            <div class="grid grid-cols-2 gap-4 text-center">

              <div class="bg-slate-50 rounded-xl p-3">
                <p class="text-xs text-gray-500">Status</p>
                <p class="font-semibold text-green-600">Surveyor</p>
              </div>

              <div class="bg-slate-50 rounded-xl p-3">
                <p class="text-xs text-gray-500">Score</p>
                <p class="font-semibold">12</p>
              </div>

              <div class="bg-slate-50 rounded-xl p-3">
                <p class="text-xs text-gray-500">Rating</p>
                <p class="font-semibold">⭐ 24</p>
              </div>

              <div class="bg-slate-50 rounded-xl p-3">
                <p class="text-xs text-gray-500">Projects</p>
                <p class="font-semibold">12</p>
              </div>

            </div>
          </div>

          <div class="rounded-2xl shadow-sm  mt-5 border-slate-300  bg-white -sm  p-6 ">
            <h4 class="font-semibold text-gray-700">Overview</h4>

              <div class=" space-y-3 mt-3">
                <div  class=" flex justify-between items-center">
                  <p class="   text-sm text-gray-600">Status</p>
                  <p class="  font-medium text-sm    text-green-700 "> Surveyor</p>
                </div>
                <div  class=" flex justify-between items-center">
                  <p class="  text-sm text-gray-600">Success score</p>
                  <p class="  font-medium text-sm    "> 12</p>
                </div>
                <div  class=" flex justify-between items-center">
                  <p class="  text-sm text-gray-600">Rating</p>
                  <p class="  font-medium text-sm  flex  gap-1   ">⭐ 24</p>
                </div>
                <div  class=" flex justify-between items-center">
                  <p class="  text-sm text-gray-600">Property</p>
                  <p class="  font-medium text-sm  flex  gap-1   ">23</p>
                </div>
                 <div  class=" flex justify-between items-center">
                  <p class="  text-sm text-gray-600">Project</p>
                  <p class="  font-medium text-sm  flex  gap-1   ">12</p>
                </div>
                <div class=" flex justify-center items-center">
                   <button  class=" border border-slate-300 duration-300  rounded-md font-medium hover:bg-primary/10  text-sm   w-full   mt-3 py-2">View Progress</button>
                </div>
              </div>
             </div>


          <!-- Earnings -->
          <div class="bg-white flex justify-between rounded-2xl shadow-sm p-6">
            <p class="text-sm text-gray-500">Earned this month</p>
            <h2 class="text-2xl font-bold mt-1">$0</h2>
          </div>

        </aside>



        <!-- ================= MAIN CONTENT ================= -->
        <main class="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">

          <!-- Welcome -->
          <div>
            <h2 class="text-2xl font-semibold">Welcome back, Habib 👋</h2>
            <p class="text-gray-500 text-sm mt-1">
              Here’s what’s happening with your account today.
            </p>
          </div>



          <!-- Widgets Row -->
          <div class="grid md:grid-cols-3 gap-6">

            <div class="bg-white rounded-2xl shadow-sm p-6">
              <p class="text-sm text-gray-500">Active Orders</p>
              <h3 class="text-xl font-semibold mt-1">0</h3>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-6">
              <p class="text-sm text-gray-500">Messages</p>
              <h3 class="text-xl font-semibold mt-1">0</h3>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-6">
              <p class="text-sm text-gray-500">Availability</p>
              <span
                class="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
              >
                Online
              </span>
            </div>

          </div>



          <!-- Announcement Card -->
          <div class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 flex justify-between items-center">

            <div>
              <h4 class="font-semibold">
                Grow your business faster 🚀
              </h4>
              <p class="text-sm text-gray-600">
                Discover tools and resources to help you succeed.
              </p>
            </div>

            <button
              class="bg-primary text-white px-5 py-2 rounded-xl text-sm font-medium"
            >
              Explore
            </button>

          </div>


          <!-- Orders Table -->
          <div class="bg-white rounded-2xl shadow-sm p-6">

            <div class="flex justify-between items-center mb-4">
              <h4 class="font-semibold">Recent Orders</h4>

              <select class="border rounded-lg px-3 py-1 text-sm">
                <option>View All</option>
              </select>
            </div>

            <div class="text-gray-400 text-sm text-center py-8">
              No orders yet
            </div>

          </div>

        </main>

      </div>
    </ContainerUser>
  </div>
</template>



<script setup>
definePageMeta({
  layout: 'auth'
})
</script>
