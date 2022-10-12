import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
// import Image from 'next/image'
import NextImage from 'next/future/image'

import appIcon from '../../../public/app-icon.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({ navigation, onSignOut, onSignIn, user, Image = NextImage, ...props }) {
  const onSearch = (e) => {
    e.preventDefault()
    props.onSearch(e.target.search.value)
  }
  return (
    <Disclosure as="nav" className="border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <a>
                      <Image
                        className="sm:block h-8 w-auto hidden lg:hidden"
                        src={appIcon}
                        alt="Your Company"
                      />
                      <Image
                        className="hidden h-8 w-auto lg:block"
                        src={appIcon}
                        alt="Your Company"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                      >
                        <a
                          className={classNames(
                            item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {!!item.Icon ? <item.Icon className="block h-6 w-6" /> : item.name}
                        </a>
                      </Link>
                    ))}



                  </div>



                </div>


                <div className="flex sm:flex-1 justify-center lg:ml-6 lg:justify-end">
                  <form className="w-full max-w-lg lg:max-w-xs" onSubmit={onSearch}>
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        data-testid="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
              </div>


              {user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          width={32}
                          height={32}
                          src={user.image}
                          alt={user.name}
                        />

                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                            >
                              <a
                                className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100')}
                              >
                                Your Profile
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={onSignOut}
                              className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100')}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <button onClick={onSignIn} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Log In
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                href={"/"}
              >
                <Disclosure.Button
                  as="a"
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-base font-medium text-center flex flex-col items-center'
                  )}
                >
                  <Image
                    className="block h-8 w-auto"
                    src={appIcon}
                    alt="Your Company"
                  />
                </Disclosure.Button>
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                >
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-base font-medium text-center flex flex-col items-center'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {!!item.Icon ? <item.Icon className="block h-6 w-6" /> : item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >
  )
}
