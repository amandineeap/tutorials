import React from 'react';
import { string } from 'prop-types';
import config from '../../config';
import { FormattedMessage } from '../../util/reactIntl';
import { parse } from '../../util/urlHelpers';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './SectionHero.module.css';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);


  /**
   * SEARCH
   */

  const { address, origin, bounds } = parse(location.search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });

  // Only render current search if full place object is available in the URL params
  const locationFieldsPresent = config.sortSearchByDistance
  ? address && origin && bounds
  : address && bounds;

  const initialSearchFormValues = {
    location: locationFieldsPresent
      ? {
          search: address,
          selectedPlace: { address, origin, bounds },
        }
      : null,
  };

  // TODO: fix this

 const onSearchSubmit = (values) => {
    const { currentSearchParams } = this.props;
    const { search, selectedPlace } = values.location;
    const { history } = this.props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};
    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      address: search,
      bounds,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }

  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          to={{
            search:
              'address=United%20States%20of%20America&bounds=71.540724%2C-66.885444%2C18.765563%2C-179.9',
          }}
          className={css.heroButton}
        >
          {/* <FormattedMessage id="SectionHero.browseButton" /> */}
          { search }
        </NamedLink>
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
