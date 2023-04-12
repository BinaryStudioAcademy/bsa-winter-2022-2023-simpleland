import { Icon, Input } from '~/libs/components/components.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteFooterContent,
  type SiteFooterUpdateContentDto,
} from '~/packages/sections/sections.js';
import { siteFooterUpdateContentValidationSchema } from '~/packages/sections/sections.js';

import { useSectionUpdate } from '../../libs/hooks/hooks.js';
import { Overlay } from '../overlay/overlay.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteFooterContent;
  type: ValueOf<typeof SectionType>;
  navigationSections: readonly ValueOf<typeof SectionType>[];
  onUpdate: (payload: unknown) => void;
};

const Footer: React.FC<Properties> = ({
  content: { logo, description, address, phone, email },
  navigationSections,
  type,
  onUpdate,
}: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<SiteFooterUpdateContentDto>({
      defaultValues: { logo, description, address, phone, email },
      validationSchema: siteFooterUpdateContentValidationSchema,
    });

  const { isEditing, handleEditingStart, handleSectionUpdate } =
    useSectionUpdate<SiteFooterUpdateContentDto>({
      onUpdate,
      handleReset,
      handleSubmit,
    });

  return (
    <div id={type} className={styles['footer']}>
      <Overlay onEdit={handleEditingStart} isEditing={isEditing}>
        <div className={styles['footer-container']}>
          <div className={styles['footer-info']}>
            <div className={styles['footer-logo']}>
              {isEditing ? (
                <Input
                  control={control}
                  errors={errors}
                  name="logo"
                  label="Footer section logo"
                  isLabelVisuallyHidden
                  onBlur={handleSectionUpdate}
                  isInline
                />
              ) : (
                logo
              )}
            </div>
            <div className={styles['footer-description']}>
              {isEditing ? (
                <Input
                  control={control}
                  errors={errors}
                  name="description"
                  label="About section description"
                  isLabelVisuallyHidden
                  onBlur={handleSectionUpdate}
                  rows={5}
                  isInline
                />
              ) : (
                description
              )}
            </div>
          </div>

          <div className={styles['footer-navigation']}>
            <div>
              <div className={styles['navigation-title']}>Navigation</div>
              <div className={styles['navigation-links']}>
                {navigationSections.map((section) => (
                  <a
                    className={styles['navigation-link']}
                    href={`#${section}`}
                    key={section}
                  >
                    {section}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles['social-media']}>
              <a href="#twitter">
                <Icon iconName="twitter" />
              </a>
              <a href="#linkedin">
                <Icon iconName="linkedin" />
              </a>
              <a href="#facebook">
                <Icon iconName="facebook" />
              </a>
            </div>
          </div>
          <div className={styles['footer-contacts']}>
            <div className={styles['footer-contacts-title']}>Contacts</div>
            <div className={styles['contacts-content']}>
              <div className={styles['contacts-item-address']}>
                <div className={styles['contact-address-title']}>Address</div>
                <div className={styles['contact-address']}>
                  {isEditing ? (
                    <Input
                      control={control}
                      errors={errors}
                      name="address"
                      label="Contact address"
                      isLabelVisuallyHidden
                      onBlur={handleSectionUpdate}
                      isInline
                      rows={6}
                    />
                  ) : (
                    <a
                      className={styles['contact-address-link']}
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        address,
                      )}`}
                    >
                      {address}
                    </a>
                  )}
                </div>
              </div>
              <div className={styles['contacts-item-email']}>
                <div className={styles['contact-email-title']}>Email</div>
                <div className={styles['contact-email']}>
                  {isEditing ? (
                    <Input
                      control={control}
                      errors={errors}
                      name="email"
                      label="Contact email"
                      isLabelVisuallyHidden
                      onBlur={handleSectionUpdate}
                      isInline
                      rows={3}
                    />
                  ) : (
                    <a
                      className={styles['contact-email-link']}
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  )}
                </div>
              </div>
              <div className={styles['contacts-item-phone']}>
                <div className={styles['contact-phone-title']}>Phone</div>
                <div className={styles['contact-phone']}>
                  {isEditing ? (
                    <Input
                      control={control}
                      errors={errors}
                      name="phone"
                      label="Contact phone"
                      isLabelVisuallyHidden
                      onBlur={handleSectionUpdate}
                      isInline
                      rows={3}
                    />
                  ) : (
                    <a
                      className={styles['contact-phone-link']}
                      href={`tel:${phone}`}
                    >
                      {phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export { Footer };
