const Preloader = ({w = '40px', h = '40px', visible = true}) => {
    
    return (
        <>
            <div style={{width: w, height: h, display: visible ? 'block' : 'none'}}>

                <div className='flex justify-center items-center'>
                    <svg className="circular-loader"viewBox="25 25 50 50" >
                        <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#00BDD3" strokeWidth="8" />
                    </svg>    
                </div>
            </div>
        </>
    );
}

export default Preloader;