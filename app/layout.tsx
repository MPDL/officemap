import type { Metadata } from 'next'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/images/layers.png'
import 'leaflet/dist/images/layers-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import './globals.css'
import localFont from 'next/font/local'

export const metadata: Metadata = {
    title: 'Officemap',
    description: 'office map ',
    authors: [
        {
            name: 'Felix Riehm',
            url: 'https://github.com/felixriehm'
        },
        {
            name: 'Jakob Lambert-Hartmann',
            url: 'https://github.com/iaquobe'
        },
    ],
}

const noto_sans_font = localFont(
    {
        src: [
            {
                path: '../public/font/Noto_Sans/NotoSans-Regular.ttf',
                weight: '400',
                style: 'normal',
            },
            {
                path: '../public/font/Noto_Sans/NotoSans-Bold.ttf',
                weight: '700',
                style: 'normal',
            },
        ],
    variable: '--font-noto-sans',
})

const material_icons_rounded_font = localFont(
    {
        src: '../public/font/MaterialIcons/MaterialSymbolsRounded[FILL,GRAD,opsz,wght].woff2',
        variable: '--font-material-icons-rounded',
    })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${noto_sans_font.variable} ${material_icons_rounded_font.variable}`}>
      <body className="font-officemap">{children}
      </body>
    </html>
  )
}
