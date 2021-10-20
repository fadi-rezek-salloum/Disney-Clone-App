import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from "../features/user/userSlice"

const Header = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if( user ) {
                setUser(user)
                history.push('/home')
            }
        })
    }, [userName])

    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider).then((result) => {
                setUser(result.user)
            }).catch(error => {
                alert(error.message)
            })
        }
        else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState)
                history.push('/')
            }).catch(error => {
                alert(error.message)
            })
        }
    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }))
    }

    return (
        <Nav>
            <NavLogo href="/">
                <img src="/images/logo.svg" alt="Disney+" />
            </NavLogo>

            {
                !userName ?
                    <Login onClick={handleAuth}>Login</Login>
                :
                    <>            
                    
                    <NavMenu>
                        <a href="/home">
                            <img src="/images/home-icon.svg" alt="Home" />
                            <span>
                                Home
                            </span>
                        </a>
                        
                        <a>
                            <img src="/images/search-icon.svg" alt="SEARCH" />
                            <span>
                                SEARCH
                            </span>
                        </a>
                        <a>
                            <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                            <span>
                                WATCHLIST
                            </span>
                        </a>
                        <a>
                            <img src="/images/original-icon.svg" alt="ORIGINALS" />
                            <span>
                                ORIGINALS
                            </span>
                        </a>
                        <a>
                            <img src="/images/movie-icon.svg" alt="MOVIES" />
                            <span>
                                MOVIES
                            </span>
                        </a>
                        <a>
                            <img src="/images/series-icon.svg" alt="SERIES" />
                            <span>
                                SERIES
                            </span>
                        </a>
                    </NavMenu>

                    <SignOut>
                        <UserImage src={userPhoto} alt={userName} />
                        <DropDown>
                            <span onClick={handleAuth}>
                                Sign Out
                            </span>
                        </DropDown>
                    </SignOut>
                    
                    </>
            }
        </Nav>
    )
}

const Nav = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`

const NavLogo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;
    
    img {
        display: block;
        width: 100%;
    }
`

const NavMenu = styled.nav`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    padding: 0;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    @media (max-width: 768px) {
        display: none;
    }

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;

        img {
            height: 20px;
            width: 20px;
            min-width: 20px;
            z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 4px 0 2px 3px;
            white-space: nowrap;
            position: relative;

            &:before {
                content: '';
                background-color: rgb(249, 249, 249);
                border-radius: 0 0 4px 4px;
                bottom: -6px;
                left: 0px;
                height: 2px;
                opacity: 0;
                position: absolute;
                right: 0;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(.25, .46, .45, .94) 0s;
                visibility: hidden;
                width: auto;
            }
        }

        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important; 
            }
        }
    }
`

const Login = styled.a`
    background-color: rgb(0, 0, 0, .6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;

    border: 1px solid #f9f9f9;
    border-radius: 4px;

    transition: all .2s ease-in-out 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: rgb(0, 0, 0);
        border-color: transparent;
    }
`

const UserImage = styled.img`
    height: 100%;
`

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background-color: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, .34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 130px;
    text-align: center;
    opacity: 0;
`

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImage} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`

export default Header