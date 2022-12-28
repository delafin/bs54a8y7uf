const Preloader = () => {
    
    return (
        <>
            <div className='p-2 w-10 h-10'>

                <div className='flex justify-center items-center'>
                    <svg className="circular-loader"viewBox="25 25 50 50" >
                        <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#00BDD3" stroke-width="8" />
                    </svg>    
                </div>
            </div>
        </>
    );
}

export default Preloader;