import Category from '../components/Category'
import NavbarCart from '../components/NavbarCart'
import ProductCard2 from '../components/ProductCard2'
import { API_URL } from '../config'
import Scrollspy from 'react-scrollspy'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../context/CartContext'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Header3 } from '../components/Header3'
import { Footer2 } from '../components/Footer2'
import Banner from '../components/Banner'
import { ToastContainer, toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import PleaseSignUpModal from '../components/PleaseSignUpModal'

export default function OrderPage({ categories, siteSettings, error }) {
  const { getNumberOfItems } = useContext(CartContext)
  const { darkMode, user } = useContext(AuthContext)
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const [bannerVisible, setBannerVisible] = useState(
    siteSettings.data?.attributes.isClosed
  )
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])
  const [openQuickView, setOpenQuickView] = useState(false)

  // get an array of categories to be used in scollpy
  let categoryItems = []
  categories.data?.map((category) => {
    let catId = category.attributes.catId
    categoryItems.push(catId)
  })

  return (
    <main className='min-h-screen bg-gradient-to-b from-white to-slate-200 dark:from-slate-900 dark:to-slate-950'>
      {(!user || user?.usedQuickRegister) && <PleaseSignUpModal />}

      <ToastContainer rtl theme={darkMode ? 'dark' : 'light'} />

      {siteSettings.data?.attributes.isClosed && (
        <Banner setBannerVisible={setBannerVisible} />
      )}
      {!openQuickView && (
        <Header3
          title={'آرکان - سفارش آنلاین'}
          description={' سفارش آنلاین و ارسال با پیک رایگان '}
          keywords={'صفحه ی سفارش آنلاین , فست فود'}
        />
      )}

      <section
        ref={parent}
        className='  flex flex-row  justify-center  bg-slate-50 py-7 dark:bg-slate-900 md:flex-col-reverse lg:flex-row'
      >
        {/**********************CART for Large screens***********************/}

        {getNumberOfItems > 0 && (
          <section className=' md:justify-left relative  mx-auto mt-3 hidden  h-fit w-72   flex-col space-y-3 pr-2 pt-2 text-slate-900 dark:text-slate-200 md:mt-1 md:flex md:min-w-fit  lg:mx-0'>
            <NavbarCart />
          </section>
        )}

        <div className=' mx-auto flex w-full flex-col-reverse justify-center space-y-3 md:w-fit  md:flex-row  md:space-x-1   lg:mx-0 '>
          {/**********************Products for Large screens***********************/}
          {/* div for categories */}
          <div className='flex flex-col   '>
            {/* add dynamic categories with dynamic products here */}
            {/* categories card */}
            {/** */}
            {categories.data?.map((category) => (
              <Category
                title={category.attributes.name}
                id={category.attributes.catId}
                key={category.attributes.catId + '-catKey'}
              >
                {/* the products inside category card */}
                {category.attributes.products.data?.map((product) => (
                  <ProductCard2
                    id={product.id}
                    title={product.attributes.title}
                    description={product.attributes.description}
                    preview={
                      product.attributes.image.data?.attributes.formats.small
                        .url
                    }
                    price={product.attributes.price}
                    discount={product.attributes.discount}
                    priceWithDiscount={product.attributes.priceWithDiscount}
                    rating={product.attributes.rating}
                    availability={product.attributes.availability}
                    key={product.id + '-prodKey'}
                    openQuickView={openQuickView}
                    setOpenQuickView={setOpenQuickView}
                  />
                ))}
              </Category>
            ))}
          </div>

          {/**********************Navigation for Large screens***********************/}
          {/*sticky and smooth */}
          <nav className=' top-10  mx-auto flex h-fit flex-col  overflow-hidden truncate pb-5 pr-0 md:sticky md:pr-5'>
            <p className='m-5  mx-auto text-base   font-bold text-slate-900 dark:text-slate-200 md:ml-0 '>
              دسته بندی ها
            </p>

            <Scrollspy
              items={categoryItems}
              currentClassName='orange-left-border'
              className='  ml-auto flex w-[76px] flex-col space-y-2 md:ml-0   '
              style={{ color: 'rgb(100 116 139)' }}
            >
              {categories.data?.map((category) => (
                <li
                  className='duration-600 my-2 flex  w-fit items-center p-1 transition-colors hover:text-slate-900 dark:hover:text-slate-100'
                  key={category.attributes.catId + '-catRefKey'}
                >
                  <a
                    href={`#${category.attributes.catId}`}
                    className='mx-2 text-sm text-inherit dark:text-slate-300'
                  >
                    {category.attributes.name}
                  </a>
                </li>
              ))}
            </Scrollspy>
          </nav>
        </div>
      </section>
      <Footer2 />
    </main>
  )
}

export async function getServerSideProps() {
  let categories,
    siteSettings,
    error = null

  try {
    const responseCategories = await fetch(
      `${API_URL}/api/categories?populate=deep`
    )
    categories = await responseCategories.json()

    const responseSettings = await fetch(`${API_URL}/api/site-settings`)
    siteSettings = await responseSettings.json()
  } catch (err) {
    error = 'سرور در دسترس نیست، لطفا دوباره بعدا تلاش کنید'
    categories = []
    siteSettings = {}
  }

  return {
    props: { categories, siteSettings, error },
  }
}
