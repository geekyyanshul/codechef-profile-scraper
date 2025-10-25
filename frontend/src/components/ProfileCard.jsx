import React from 'react';

/**
 * A component to display the scraped CodeChef profile information.
 * @param {object} props - Component props.
 * @param {object} props.profile - The profile data object.
 */
const ProfileCard = ({ profile }) => {
  const {
    name,
    username,
    profilePic,
    rating,
    stars,
    globalRank,
    countryRank,
    profileUrl,
  } = profile;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={profilePic} 
          alt={`${name}'s profile picture`}
          className="profile-pic"
          // Fallback image in case the src is broken or relative
          onError={(e) => e.target.src = 'https://placehold.co/100x100/eeeeee/cccccc?text=User'}
        />
        <div className="profile-info">
          <h2>{name}</h2>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            @{username}
          </a>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="stat-item">
          <span className="stat-item-label">Rating</span>
          <span className="stat-item-value">{rating || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Stars</span>
          <span className="stat-item-value">{stars || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Global Rank</span>
          <span className="stat-item-value">{globalRank || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Country Rank</span>
          <span className="stat-item-value">{countryRank || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
