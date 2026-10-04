import React from "react";
import { SignUpButton } from "@clerk/react";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-green-50 text-slate-800">

      {/* Background — same style as the existing HashVault form */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-green-400 opacity-20 blur-[120px]" />
      </div>

      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute left-[-120px] top-[500px] -z-10 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-[700px] -z-10 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />

      <main>

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/70 px-4 py-2 text-sm font-medium text-green-800 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Your personal password manager
              </div>

              <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Your passwords.
                <span className="block text-green-700">
                  Organized. Secure.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                HashVault makes it simple to store, manage and access your
                credentials from one clean, intuitive dashboard.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <SignUpButton mode="modal">
                  <button
                    className="rounded-full bg-green-600 px-8 py-3.5 font-semibold
                               text-white shadow-lg shadow-green-600/20
                               transition hover:-translate-y-0.5 hover:bg-green-700"
                  >
                    Get Started
                  </button>
                </SignUpButton>

                <a
                  href="#features"
                  className="rounded-full border border-green-300 bg-white/70
                             px-8 py-3.5 text-center font-semibold text-green-800
                             shadow-sm backdrop-blur transition hover:bg-green-100"
                >
                  Explore HashVault
                </a>
              </div>

              {/* Small credibility line */}
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span>✓ Simple credential management</span>
                <span>✓ Password generation</span>
                <span>✓ Authenticated access</span>
              </div>
            </div>

            {/* PRODUCT PREVIEW */}
            <div className="relative">

              {/* Glow */}
              <div className="absolute -inset-6 rounded-[2rem] bg-green-400/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-green-200
                              bg-white/90 shadow-2xl shadow-green-900/10 backdrop-blur">

                {/* Browser header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-800 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="text-sm font-semibold text-white">
                    &lt;Hash<span className="text-green-400">Vault/&gt;</span>
                  </div>

                  <div className="h-6 w-6 rounded-full bg-green-500/20" />
                </div>

                {/* Dashboard */}
                <div className="bg-green-50 p-5 sm:p-7">

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Password Manager
                    </h3>
                    <p className="text-sm text-slate-500">
                      Manage your credentials in one place
                    </p>
                  </div>

                  {/* Form preview */}
                  <div className="space-y-3 rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
                    <div className="h-10 rounded-full border border-green-300 px-4 text-sm flex items-center text-slate-400">
                      Enter website URL
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="h-10 rounded-full border border-green-300 px-4 text-sm flex items-center text-slate-400">
                        Enter Username
                      </div>

                      <div className="h-10 rounded-full border border-green-300 px-4 text-sm flex items-center justify-between text-slate-400">
                        <span>••••••••••</span>
                        <span className="text-green-700">◉</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <div className="rounded-full bg-green-600 px-5 py-2 text-xs font-semibold text-white">
                        Generate Password
                      </div>
                    </div>
                  </div>

                  {/* Password list */}
                  <div className="mt-5 rounded-2xl border border-green-200 bg-white shadow-sm">
                    <div className="border-b border-green-200 px-5 py-4">
                      <div className="text-sm font-bold text-slate-800">
                        Your Passwords
                      </div>
                    </div>

                    <div className="divide-y divide-green-100">

                      <div className="flex items-center justify-between px-5 py-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">
                            github.com
                          </div>
                          <div className="text-xs text-slate-500">
                            developer
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm tracking-widest">
                            ********
                          </span>
                          <span className="text-green-700">⧉</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-5 py-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">
                            linkedin.com
                          </div>
                          <div className="text-xs text-slate-500">
                            professional
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm tracking-widest">
                            ********
                          </span>
                          <span className="text-green-700">⧉</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-5 py-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">
                            gmail.com
                          </div>
                          <div className="text-xs text-slate-500">
                            personal
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm tracking-widest">
                            ********
                          </span>
                          <span className="text-green-700">⧉</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Floating status card */}
              <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-green-200
                              bg-white/95 px-5 py-4 shadow-xl backdrop-blur sm:block">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Security check
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="font-semibold text-slate-800">
                    Password strength: Strong
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-green-700">BUILT FOR REAL USE</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Simple on the surface.
              <span className="block text-green-700">
                Thoughtful underneath.
              </span>
            </h2>

            <p className="mt-4 text-slate-600">
              A focused experience for managing credentials without unnecessary
              complexity.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-3xl border border-green-200 bg-white/75 p-7
                            shadow-sm backdrop-blur transition duration-300
                            hover:-translate-y-1 hover:shadow-xl">

              <div className="mb-6 flex h-12 w-12 items-center justify-center
                              rounded-2xl bg-green-100 text-xl text-green-700">
                ◈
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Password generation
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Generate strong passwords quickly with configurable validation
                rules built into the experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl border border-green-200 bg-white/75 p-7
                            shadow-sm backdrop-blur transition duration-300
                            hover:-translate-y-1 hover:shadow-xl">

              <div className="mb-6 flex h-12 w-12 items-center justify-center
                              rounded-2xl bg-green-100 text-xl text-green-700">
                ◉
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Secure authentication
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Authenticated user access keeps each person's password
                management experience separated and controlled.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl border border-green-200 bg-white/75 p-7
                            shadow-sm backdrop-blur transition duration-300
                            hover:-translate-y-1 hover:shadow-xl">

              <div className="mb-6 flex h-12 w-12 items-center justify-center
                              rounded-2xl bg-green-100 text-xl text-green-700">
                ↗
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Fast credential access
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Save, edit, copy and manage credentials through a clean,
                responsive dashboard.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">

          <div className="rounded-[2rem] bg-slate-800 px-7 py-16 shadow-2xl sm:px-12">

            <p className="font-semibold text-green-400">
              READY WHEN YOU ARE
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A better way to manage your passwords.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Start with a clean dashboard designed to make credential
              management simple.
            </p>

            <div className="mt-8">
              <SignUpButton mode="modal">
                <button
                  className="rounded-full bg-green-500 px-8 py-3.5 font-semibold
                             text-slate-900 transition hover:bg-green-400"
                >
                  Create your vault
                </button>
              </SignUpButton>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
};

export default Landing;