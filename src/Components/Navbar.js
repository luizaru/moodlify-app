import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Link, useLocation} from "react-router-dom";
import avatarLarge from "../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../config/services/useAuth";

function Menu(props) {  

  const { open, onClick } = props;

  const location = useLocation();

  const StyledNav = styled.nav`
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  const StyledLi = styled.li`
    margin-bottom: 10%;
    cursor: pointer;
    width: 100%;
    text-align: center;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    background:   ${({ theme, active }) => active ? theme.colors.darkShade[25] : ""}
  `;

  const StyledClosedParagraph = styled.p`
    text-align: right;
  `;

  return (
    <div>
      <StyledClosedParagraph onClick={onClick}> X </StyledClosedParagraph>
      <StyledNav>
        <ul>
          <StyledLi active={location.pathname === "/signin"}> <Link to="/signin"> Sign In </Link>
          </StyledLi>
          <StyledLi active={location.pathname === "/signup"}> <Link to="/signup"> Sign Up </Link>
          </StyledLi>
          <StyledLi active={location.pathname === "/"}> <Link to="/"> My Dashboard </Link>
          </StyledLi>
          <StyledLi active={location.pathname === "/account"}> <Link to="/account"> Account </Link>
          </StyledLi>
          <StyledLi active={location.pathname === "/dailycheckin"}> <Link to="/dailycheckin"> Daily Check-in </Link>
          </StyledLi>
          <StyledLi active={location.pathname === "/andoperatortest"}> <Link to="/andoperatortest"> Conditional Rendering (Test) </Link>
          </StyledLi>
          <StyledLi active={location.pathname === "/formvalidationtest"}> <Link to="/formvalidationtest"> Form Validation (Test) </Link>
          </StyledLi>
        </ul>
      </StyledNav>
    </div>
      );
}


Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function Header(props) {
  const { onClick, open, signOut} = props;
  const { user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    onClick(e);
    console.log('Header.handleClick()');
  }
  
  const StyledBurgerMenu = styled.div`
    width: 100px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    hr {
      margin: 4px 0 0 4px;
      width: 20%;
      border: 1px solid ${({ theme }) => theme.colors.darkShade[100]};
    }
  `;

  const StyledUserAvatar = styled.div`
    color: ${({ theme }) => theme.colors.darkShade[50]};
    display: flex;
    align-items: center;
    img {
      margin-top: 8%;
    }
  `;

  const StyledMenuWrapper = styled.div`
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  width: 304px;
  background: #00A86B;
  position: absolute;
  padding-top: 10%;
  top: 0;
  left: 0;
`;

  const StyledWrapper = styled.div`
    width: 100%;
    background: #00A86B;
    height: 50px;
    display: flex;
    justify-content: space-between;
  `;

  const handleClickBurgerMenu = (e) => {
    e.preventDefault();
    onClick(e);
    console.log('Header.handleClickBurgerMenu');
  }


  return (
    <div>
      <StyledMenuWrapper open={open}>
        <Menu onClick={ handleClick } />
      </StyledMenuWrapper>
     
      <StyledWrapper>
        <StyledBurgerMenu onClick={handleClickBurgerMenu}>
          <hr />
          <hr />
          <hr />
        </StyledBurgerMenu>
        <StyledUserAvatar>
          <FontAwesomeIcon style={{ fontSize: "16px" }} icon={faChevronDown} />
          <h6> {user.displayName} {user.email} </h6>
          <span style={{ cursor: "pointer" }} onClick={() => signOut()}> (sign out) </span>
          <img src={avatarLarge} />
        </StyledUserAvatar>
      </StyledWrapper>
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
