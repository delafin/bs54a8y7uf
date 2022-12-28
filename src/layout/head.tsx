import Head from "next/head";



function Header({children}:Children) {
    
    return (
        <>
            < Head >
                {/* <!-- IF favicon.html not include --> */}
                <link rel='icon' href='/favicon.svg'/>
                
                {/* <!-- Use Only and Always in `app.tsx` --> */}
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                
                <title>Abz.agency</title>
                
                <meta name='title' content='Abz.agency - test'/>
                <meta name='description' content='Abz.agency - test'/>
                
                {/* <!-- Open Graph / Facebook --> */}
                <meta property='og:type' content='website'/>
                <meta property='og:url' content=''/>
                <meta property='og:title' content='Abz.agency - test'/>
                <meta property='og:description' content='Abz.agency - test'/>
                <meta property='og:image' content='/meta.jpg'/>
                
                {/* <!-- Twitter --> */}
                <meta property='twitter:card' content='summary_large_image'/>
                <meta property='twitter:url' content=''/>
                <meta property='twitter:title' content='Abz.agency - test'/>
                <meta property='twitter:description' content='Abz.agency - test'/>
                <meta property='twitter:image' content='/meta.jpg'/>
            </ Head >
            {children}
        </>
        
    );
}

export default Header;
