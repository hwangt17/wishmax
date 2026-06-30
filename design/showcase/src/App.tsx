/*
 * Wishmax design-system showcase — token sample page.
 *
 * Every value rendered below is read from a design token via var(--…),
 * sourced from ../../tokens.css (mirror of DESIGN.md). There are no literal
 * hex / px / font values in this file — that is the point of the harness:
 * it proves the token pipeline end to end.
 */

import { useState } from 'react'
import {
  Badge,
  BeforeAfterCard,
  Button,
  Card,
  Chip,
  ChipGroup,
  FeedPhotoTile,
  Sheet,
} from './components'

const COLOR_TOKENS = [
  { name: 'Midnight Ink', token: '--color-midnight-ink' },
  { name: 'Pure Canvas', token: '--color-pure-canvas' },
  { name: 'Graphite', token: '--color-graphite' },
  { name: 'Slate', token: '--color-slate' },
  { name: 'Ash', token: '--color-ash' },
  { name: 'Fog', token: '--color-fog' },
  { name: 'Silver', token: '--color-silver' },
  { name: 'Warm Sand', token: '--color-warm-sand' },
  { name: 'Sky Periwinkle', token: '--color-sky-periwinkle' },
  { name: 'Party Pink', token: '--color-party-pink' },
  { name: 'Spearmint', token: '--color-spearmint' },
  { name: 'Midnight Blue', token: '--color-midnight-blue' },
]

const STATUS_TOKENS = [
  { name: 'Done', token: '--color-status-done' },
  { name: 'Processing', token: '--color-status-processing' },
  { name: 'Failed', token: '--color-status-failed' },
]

const GRADIENT_TOKENS = [
  { name: 'Party Pink', token: '--gradient-party-pink' },
  { name: 'Sky Periwinkle', token: '--gradient-sky-periwinkle' },
  { name: 'Spearmint', token: '--gradient-spearmint' },
]

const TYPE_TOKENS = [
  { name: 'display', size: '--text-display', leading: '--leading-display', tracking: '--tracking-display', display: true },
  { name: 'heading-lg', size: '--text-heading-lg', leading: '--leading-heading-lg', tracking: '--tracking-heading-lg', display: true },
  { name: 'heading', size: '--text-heading', leading: '--leading-heading', tracking: '--tracking-heading', display: false },
  { name: 'heading-sm', size: '--text-heading-sm', leading: '--leading-heading-sm', tracking: '--tracking-heading-sm', display: false },
  { name: 'body', size: '--text-body', leading: '--leading-body', tracking: '--tracking-body', display: false },
  { name: 'caption', size: '--text-caption', leading: '--leading-caption', tracking: '--tracking-caption', display: false },
]

const SPACING_TOKENS = [4, 6, 8, 10, 12, 16, 20, 24, 30, 40, 60, 80, 100, 120, 160]

const RADIUS_TOKENS = [
  { name: 'navpills', token: '--radius-navpills' },
  { name: 'buttons / inputs', token: '--radius-buttons' },
  { name: 'cards / images', token: '--radius-cards' },
  { name: 'modals', token: '--radius-modals' },
  { name: 'badges (full)', token: '--radius-full' },
]

function v(token: string): string {
  return `var(${token})`
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: v('--text-heading'),
        lineHeight: v('--leading-heading'),
        letterSpacing: v('--tracking-heading'),
        fontWeight: v('--font-weight-bold'),
        margin: 0,
        marginBottom: v('--spacing-20'),
      }}
    >
      {children}
    </h2>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      style={{ marginBottom: v('--spacing-80'), scrollMarginTop: v('--spacing-20') }}
    >
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  )
}

/* A group divider — splits the reference page into Foundations vs Components. */
function GroupHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div
      id={id}
      style={{
        borderTop: `1px solid var(--color-silver)`,
        paddingTop: v('--spacing-24'),
        marginBottom: v('--spacing-40'),
        scrollMarginTop: v('--spacing-20'),
      }}
    >
      <div
        style={{
          fontSize: v('--text-caption'),
          letterSpacing: v('--tracking-caption'),
          fontWeight: v('--font-weight-bold'),
          textTransform: 'uppercase',
          color: v('--color-ash'),
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: v('--font-display'),
          fontSize: v('--text-heading-lg'),
          lineHeight: v('--leading-heading-lg'),
          letterSpacing: v('--tracking-heading-lg'),
          fontWeight: v('--font-weight-medium'),
          margin: 0,
          marginTop: v('--spacing-6'),
        }}
      >
        {title}
      </h2>
    </div>
  )
}

/* In-page table of contents so a reviewer can jump to any section. */
const TOC = [
  { group: 'Foundations', items: [
    { id: 'palette', label: 'Palette' },
    { id: 'status', label: 'Status colors' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'fonts', label: 'Fonts' },
    { id: 'type', label: 'Type scale' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'shadows', label: 'Shadows' },
  ] },
  { group: 'Components', items: [
    { id: 'controls', label: 'Core controls' },
    { id: 'feed', label: 'Feed & before/after' },
    { id: 'cards', label: 'Cards & surfaces' },
  ] },
]

function Nav() {
  return (
    <nav
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: v('--spacing-30'),
        padding: v('--spacing-20'),
        marginBottom: v('--spacing-60'),
        backgroundColor: v('--surface-tint-soft'),
        borderRadius: v('--radius-cards'),
      }}
    >
      {TOC.map((g) => (
        <div key={g.group} style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-8') }}>
          <div
            style={{
              fontSize: v('--text-caption'),
              letterSpacing: v('--tracking-caption'),
              fontWeight: v('--font-weight-bold'),
              textTransform: 'uppercase',
              color: v('--color-ash'),
            }}
          >
            {g.group}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: v('--spacing-16') }}>
            {g.items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                style={{
                  fontSize: v('--text-body'),
                  letterSpacing: v('--tracking-body'),
                  fontWeight: v('--font-weight-w550'),
                  color: v('--color-midnight-ink'),
                  textDecorationColor: v('--color-silver'),
                }}
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

function Swatch({ name, token, isGradient }: { name: string; token: string; isGradient?: boolean }) {
  return (
    <div style={{ width: v('--spacing-160') }}>
      <div
        style={{
          height: v('--spacing-80'),
          [isGradient ? 'backgroundImage' : 'backgroundColor']: v(token),
          borderRadius: v('--radius-cards'),
          boxShadow: v('--shadow-sm'),
          border: `1px solid var(--color-silver)`,
        }}
      />
      <div style={{ marginTop: v('--spacing-8') }}>
        <div
          style={{
            fontSize: v('--text-body'),
            letterSpacing: v('--tracking-body'),
            fontWeight: v('--font-weight-semibold'),
          }}
        >
          {name}
        </div>
        <code
          style={{
            fontSize: v('--text-caption'),
            letterSpacing: v('--tracking-caption'),
            color: v('--color-slate'),
          }}
        >
          {token}
        </code>
      </div>
    </div>
  )
}

function SwatchGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: v('--spacing-20') }}>{children}</div>
  )
}

/* A labeled cell: a component sample above a caption naming its state. */
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: v('--spacing-8'),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', minHeight: v('--spacing-40') }}>
        {children}
      </div>
      <code style={{ fontSize: v('--text-caption'), color: v('--color-slate') }}>{label}</code>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: v('--spacing-24'),
      }}
    >
      {children}
    </div>
  )
}

/* A dark photo-stand-in surface for the on-photo/on-dark variants. */
function PhotoStand({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: v('--spacing-24'),
        background: v('--surface-overlay-ink'),
        borderRadius: v('--radius-cards'),
        padding: v('--spacing-20'),
      }}
    >
      {children}
    </div>
  )
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: v('--text-caption'),
        letterSpacing: v('--tracking-caption'),
        fontWeight: v('--font-weight-bold'),
        textTransform: 'uppercase',
        color: v('--color-ash'),
        marginBottom: v('--spacing-12'),
      }}
    >
      {children}
    </div>
  )
}

function CoreControls() {
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState('all')
  const genders = ['all', 'men', 'women']

  function runLoading() {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1600)
  }

  return (
    <Section id="controls" title="Core controls">
      <div style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-40') }}>
        {/* Primary filled button — every state */}
        <div>
          <SubLabel>Primary filled button — main CTAs</SubLabel>
          <Row>
            <Cell label="default">
              <Button>Get my photos</Button>
            </Cell>
            <Cell label="hover">
              <Button forceState="hover">Get my photos</Button>
            </Cell>
            <Cell label="pressed">
              <Button forceState="pressed">Get my photos</Button>
            </Cell>
            <Cell label="disabled">
              <Button disabled>Get my photos</Button>
            </Cell>
            <Cell label="loading">
              <Button loading>Get my photos</Button>
            </Cell>
            <Cell label="interactive — click to load">
              <Button loading={loading} onClick={runLoading}>
                Apply my face
              </Button>
            </Cell>
          </Row>
        </div>

        {/* Primary on photo/hero — inverts to white-on-black */}
        <div>
          <SubLabel>Primary on photo / hero (white fill)</SubLabel>
          <PhotoStand>
            <Cell label="default">
              <Button onPhoto>Upload selfie</Button>
            </Cell>
            <Cell label="hover">
              <Button onPhoto forceState="hover">
                Upload selfie
              </Button>
            </Cell>
            <Cell label="pressed">
              <Button onPhoto forceState="pressed">
                Upload selfie
              </Button>
            </Cell>
          </PhotoStand>
        </div>

        {/* Ghost button — every state */}
        <div>
          <SubLabel>Ghost button — secondary / header action</SubLabel>
          <Row>
            <Cell label="default">
              <Button variant="ghost">Log in</Button>
            </Cell>
            <Cell label="hover">
              <Button variant="ghost" forceState="hover">
                Log in
              </Button>
            </Cell>
            <Cell label="pressed">
              <Button variant="ghost" forceState="pressed">
                Log in
              </Button>
            </Cell>
            <Cell label="disabled">
              <Button variant="ghost" disabled>
                Log in
              </Button>
            </Cell>
          </Row>
        </div>

        {/* Filter chip — interactive selector + state matrix */}
        <div>
          <SubLabel>Filter chip — gender selector &amp; category filter</SubLabel>
          <Row>
            <Cell label={`interactive — selected: ${gender}`}>
              <ChipGroup>
                {genders.map((g) => (
                  <Chip key={g} active={gender === g} onClick={() => setGender(g)}>
                    {g[0].toUpperCase() + g.slice(1)}
                  </Chip>
                ))}
              </ChipGroup>
            </Cell>
          </Row>
          <div style={{ marginTop: v('--spacing-16') }}>
            <Row>
              <Cell label="default">
                <ChipGroup>
                  <Chip>Casual</Chip>
                </ChipGroup>
              </Cell>
              <Cell label="hover">
                <ChipGroup>
                  <Chip forceState="hover">Casual</Chip>
                </ChipGroup>
              </Cell>
              <Cell label="pressed">
                <ChipGroup>
                  <Chip forceState="pressed">Casual</Chip>
                </ChipGroup>
              </Cell>
              <Cell label="active / selected">
                <ChipGroup>
                  <Chip active>Casual</Chip>
                </ChipGroup>
              </Cell>
              <Cell label="disabled">
                <ChipGroup>
                  <Chip disabled>Casual</Chip>
                </ChipGroup>
              </Cell>
            </Row>
          </div>
          <div style={{ marginTop: v('--spacing-16') }}>
            <PhotoStand>
              <Cell label="on photo — active uses Warm Sand">
                <ChipGroup onPhoto>
                  {genders.map((g, i) => (
                    <Chip key={g} active={i === 0}>
                      {g[0].toUpperCase() + g.slice(1)}
                    </Chip>
                  ))}
                </ChipGroup>
              </Cell>
            </PhotoStand>
          </div>
        </div>

        {/* Pill badge — tones, tags, and generation status */}
        <div>
          <SubLabel>Pill badge / tag</SubLabel>
          <Row>
            <Cell label="soft">
              <Badge>Portrait</Badge>
            </Cell>
            <Cell label="strong">
              <Badge tone="strong">Premium</Badge>
            </Cell>
            <Cell label="credits">
              <Badge>12 credits</Badge>
            </Cell>
            <Cell label="status — Done">
              <Badge status="done">Done</Badge>
            </Cell>
            <Cell label="status — Processing">
              <Badge status="processing">Processing</Badge>
            </Cell>
            <Cell label="status — Failed">
              <Badge status="failed">Failed</Badge>
            </Cell>
          </Row>
        </div>
      </div>
    </Section>
  )
}

/* Fixed-width stand for the full-bleed tiles (which are width: 100%). */
function TileStand({ width, children }: { width: string; children: React.ReactNode }) {
  return <div style={{ width: v(width) }}>{children}</div>
}

function FeedComponents() {
  const [picked, setPicked] = useState('classic')
  const tiles = [
    { id: 'classic', placeholder: '--gradient-party-pink', category: 'Classic' },
    { id: 'spearmint', placeholder: '--gradient-spearmint', category: 'Outdoor' },
    { id: 'periwinkle', placeholder: '--gradient-sky-periwinkle', category: 'Studio' },
  ]

  return (
    <Section id="feed" title="Feed photo tile & before/after">
      <div style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-40') }}>
        {/* Feed photo tile — overlays, selection, shimmer */}
        <div>
          <SubLabel>Feed photo tile — ~3:4 portrait, full-bleed, 12px radius</SubLabel>
          <Row>
            <Cell label="default (full-bleed)">
              <TileStand width="--spacing-160">
                <FeedPhotoTile placeholder="--gradient-party-pink" />
              </TileStand>
            </Cell>
            <Cell label="category chip">
              <TileStand width="--spacing-160">
                <FeedPhotoTile placeholder="--gradient-spearmint" category="Outdoor" />
              </TileStand>
            </Cell>
            <Cell label="lock / Premium badge">
              <TileStand width="--spacing-160">
                <FeedPhotoTile placeholder="--gradient-sky-periwinkle" premium />
              </TileStand>
            </Cell>
            <Cell label="category + Premium">
              <TileStand width="--spacing-160">
                <FeedPhotoTile placeholder="--gradient-party-pink" category="Studio" premium />
              </TileStand>
            </Cell>
            <Cell label="selected">
              <TileStand width="--spacing-160">
                <FeedPhotoTile placeholder="--gradient-spearmint" selected />
              </TileStand>
            </Cell>
            <Cell label="pressed">
              <TileStand width="--spacing-160">
                <FeedPhotoTile placeholder="--gradient-sky-periwinkle" forceState="pressed" />
              </TileStand>
            </Cell>
            <Cell label="loading (shimmer)">
              <TileStand width="--spacing-160">
                <FeedPhotoTile loading />
              </TileStand>
            </Cell>
          </Row>
        </div>

        {/* Interactive feed row — pick a tile (selection state) */}
        <div>
          <SubLabel>Feed row — click to pick (selected: {picked})</SubLabel>
          <Row>
            {tiles.map((t) => (
              <Cell key={t.id} label={t.category}>
                <TileStand width="--spacing-160">
                  <FeedPhotoTile
                    placeholder={t.placeholder}
                    category={t.category}
                    selected={picked === t.id}
                    onClick={() => setPicked(t.id)}
                  />
                </TileStand>
              </Cell>
            ))}
          </Row>
        </div>

        {/* Before / after card */}
        <div>
          <SubLabel>Before / after card — transformation proof</SubLabel>
          <Row>
            <Cell label="paired tiles + Before/After labels">
              <div style={{ width: `calc(${v('--spacing-160')} * 2)` }}>
                <BeforeAfterCard
                  beforePlaceholder="--gradient-sky-periwinkle"
                  afterPlaceholder="--gradient-party-pink"
                />
              </div>
            </Cell>
            <Cell label="selected (result reveal)">
              <div style={{ width: `calc(${v('--spacing-160')} * 2)` }}>
                <BeforeAfterCard
                  beforePlaceholder="--gradient-spearmint"
                  afterPlaceholder="--gradient-party-pink"
                  selected
                />
              </div>
            </Cell>
          </Row>
        </div>
      </div>
    </Section>
  )
}

function CardSurfaces() {
  const [openModal, setOpenModal] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const modalActions = (
    <>
      <Button onClick={() => setOpenModal(false)}>Get my photos</Button>
      <Button variant="ghost" onClick={() => setOpenModal(false)}>
        Maybe later
      </Button>
    </>
  )
  const sheetActions = (
    <>
      <Button onClick={() => setOpenSheet(false)}>Apply my face</Button>
      <Button variant="ghost" onClick={() => setOpenSheet(false)}>
        Cancel
      </Button>
    </>
  )

  return (
    <Section id="cards" title="Cards & surfaces">
      <div style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-40') }}>
        {/* Standard content card — two type sizes, shadow-sm, 12px radius */}
        <div>
          <SubLabel>Content card — white, 12px radius, --shadow-sm, two type sizes</SubLabel>
          <Row>
            <Cell label="title + body">
              <div style={{ width: v('--spacing-160') }}>
                <Card title="Studio Light">
                  A clean, professional portrait look that reads instantly as
                  dating-app ready.
                </Card>
              </div>
            </Cell>
            <Cell label="with media (feed tile)">
              <div style={{ width: v('--spacing-160') }}>
                <Card
                  title="Outdoor Golden"
                  media={<FeedPhotoTile placeholder="--gradient-party-pink" category="Outdoor" />}
                >
                  Warm, candid energy shot in soft evening light.
                </Card>
              </div>
            </Cell>
            <Cell label="testimonial">
              <div style={{ width: v('--spacing-160') }}>
                <Card title="3× more matches">
                  “Swapped my profile photo and the replies tripled in a week.”
                </Card>
              </div>
            </Cell>
          </Row>
        </div>

        {/* Modal & sheet surfaces — rendered inline so both are always visible */}
        <div>
          <SubLabel>Modal &amp; sheet surfaces — 16px radius, --shadow-lg</SubLabel>
          <Row>
            <Cell label="modal (centered)">
              <div style={{ width: `calc(${v('--spacing-160')} * 2)` }}>
                <Sheet
                  inline
                  variant="modal"
                  title="Unlock Premium"
                  actions={modalActions}
                  onClose={() => {}}
                >
                  Get unlimited generations and every template style. Cancel
                  anytime.
                </Sheet>
              </div>
            </Cell>
            <Cell label="bottom sheet (grab handle)">
              <div style={{ width: `calc(${v('--spacing-160')} * 2)` }}>
                <Sheet
                  inline
                  variant="sheet"
                  title="Choose your look"
                  actions={sheetActions}
                >
                  Pick a template style and we’ll put your face into it.
                </Sheet>
              </div>
            </Cell>
          </Row>
        </div>

        {/* Interactive overlay mode — real scrim + dismiss */}
        <div>
          <SubLabel>Overlay mode — open the real surface (scrim · Escape · close)</SubLabel>
          <Row>
            <Cell label="open modal">
              <Button onClick={() => setOpenModal(true)}>Open modal</Button>
            </Cell>
            <Cell label="open sheet">
              <Button variant="ghost" onClick={() => setOpenSheet(true)}>
                Open sheet
              </Button>
            </Cell>
          </Row>
          <Sheet
            variant="modal"
            open={openModal}
            onClose={() => setOpenModal(false)}
            title="Unlock Premium"
            actions={modalActions}
          >
            Get unlimited generations and every template style. Cancel anytime.
          </Sheet>
          <Sheet
            variant="sheet"
            open={openSheet}
            onClose={() => setOpenSheet(false)}
            title="Choose your look"
            actions={sheetActions}
          >
            Pick a template style and we’ll put your face into it.
          </Sheet>
        </div>
      </div>
    </Section>
  )
}

export function App() {
  return (
    <main
      style={{
        maxWidth: v('--page-max-width'),
        margin: '0 auto',
        padding: v('--spacing-40'),
      }}
    >
      <header style={{ marginBottom: v('--spacing-60') }}>
        <h1
          style={{
            fontFamily: v('--font-display'),
            fontSize: v('--text-display'),
            lineHeight: v('--leading-display'),
            letterSpacing: v('--tracking-display'),
            fontWeight: v('--font-weight-medium'),
            margin: 0,
          }}
        >
          Wishmax Design System
        </h1>
        <p
          style={{
            fontSize: v('--text-heading-sm'),
            letterSpacing: v('--tracking-heading-sm'),
            color: v('--color-slate'),
            marginTop: v('--spacing-10'),
            maxWidth: `calc(${v('--spacing-160')} * 4)`,
          }}
        >
          Showcase harness — every value below is read from a token in{' '}
          <code>design/tokens.css</code>. No hardcoded visual values.
        </p>
      </header>

      <Nav />

      <GroupHeading id="foundations" eyebrow="Layer 01" title="Foundations" />

      <Section id="fonts" title="Fonts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-20') }}>
          <div>
            <code style={{ fontSize: v('--text-caption'), color: v('--color-slate') }}>
              --font-display · Space Grotesk (Medium 500) · display / hero only
            </code>
            <div
              style={{
                fontFamily: v('--font-display'),
                fontSize: v('--text-heading-lg'),
                lineHeight: v('--leading-heading-lg'),
                letterSpacing: v('--tracking-heading-lg'),
                fontWeight: v('--font-weight-medium'),
              }}
            >
              Anything you wish for comes true.
            </div>
          </div>
          <div>
            <code style={{ fontSize: v('--text-caption'), color: v('--color-slate') }}>
              --font-sans · Inter (400–700) · all UI text & body
            </code>
            <p
              style={{
                fontFamily: v('--font-sans'),
                fontSize: v('--text-body'),
                lineHeight: v('--leading-body'),
                letterSpacing: v('--tracking-body'),
                color: v('--color-graphite'),
                maxWidth: `calc(${v('--spacing-160')} * 4)`,
                margin: 0,
                marginTop: v('--spacing-6'),
              }}
            >
              Put your own face into curated, professional-looking template photos and
              get profile-ready shots. The quick brown fox jumps over the lazy dog —
              0123456789.
            </p>
          </div>
        </div>
      </Section>

      <Section id="palette" title="Palette">
        <SwatchGrid>
          {COLOR_TOKENS.map((c) => (
            <Swatch key={c.token} name={c.name} token={c.token} />
          ))}
        </SwatchGrid>
      </Section>

      <Section id="status" title="Status colors (generation state only)">
        <SwatchGrid>
          {STATUS_TOKENS.map((c) => (
            <Swatch key={c.token} name={c.name} token={c.token} />
          ))}
        </SwatchGrid>
      </Section>

      <Section id="gradients" title="Gradients (surfaces / overlays only)">
        <SwatchGrid>
          {GRADIENT_TOKENS.map((g) => (
            <Swatch key={g.token} name={g.name} token={g.token} isGradient />
          ))}
        </SwatchGrid>
      </Section>

      <Section id="type" title="Type scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-16') }}>
          {TYPE_TOKENS.map((t) => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'baseline', gap: v('--spacing-20') }}>
              <code
                style={{
                  fontSize: v('--text-caption'),
                  color: v('--color-slate'),
                  width: v('--spacing-120'),
                  flexShrink: 0,
                }}
              >
                {t.size}
              </code>
              <span
                style={{
                  fontFamily: t.display ? v('--font-display') : v('--font-sans'),
                  fontSize: v(t.size),
                  lineHeight: v(t.leading),
                  letterSpacing: v(t.tracking),
                  fontWeight: t.display ? v('--font-weight-medium') : v('--font-weight-bold'),
                }}
              >
                {t.name} — Anything you wish for
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="spacing" title="Spacing scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: v('--spacing-8') }}>
          {SPACING_TOKENS.map((n) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: v('--spacing-16') }}>
              <code
                style={{
                  fontSize: v('--text-caption'),
                  color: v('--color-slate'),
                  width: v('--spacing-100'),
                  flexShrink: 0,
                }}
              >
                --spacing-{n}
              </code>
              <div
                style={{
                  height: v('--spacing-12'),
                  width: v(`--spacing-${n}`),
                  backgroundColor: v('--color-midnight-ink'),
                  borderRadius: v('--radius-navpills'),
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="radius" title="Radius">
        <SwatchGrid>
          {RADIUS_TOKENS.map((r) => (
            <div key={r.token} style={{ width: v('--spacing-160') }}>
              <div
                style={{
                  height: v('--spacing-80'),
                  backgroundColor: v('--color-pure-canvas'),
                  border: `1px solid var(--color-midnight-ink)`,
                  borderRadius: v(r.token),
                }}
              />
              <div
                style={{
                  marginTop: v('--spacing-8'),
                  fontSize: v('--text-body'),
                  fontWeight: v('--font-weight-semibold'),
                }}
              >
                {r.name}
              </div>
              <code style={{ fontSize: v('--text-caption'), color: v('--color-slate') }}>{r.token}</code>
            </div>
          ))}
        </SwatchGrid>
      </Section>

      <Section id="shadows" title="Shadows">
        <SwatchGrid>
          {[
            { name: 'shadow-sm', token: '--shadow-sm' },
            { name: 'shadow-lg', token: '--shadow-lg' },
          ].map((s) => (
            <div key={s.token} style={{ width: v('--spacing-160'), padding: v('--spacing-12') }}>
              <div
                style={{
                  height: v('--spacing-80'),
                  backgroundColor: v('--surface-card'),
                  borderRadius: v('--radius-cards'),
                  boxShadow: v(s.token),
                }}
              />
              <div
                style={{
                  marginTop: v('--spacing-16'),
                  fontSize: v('--text-body'),
                  fontWeight: v('--font-weight-semibold'),
                }}
              >
                {s.name}
              </div>
              <code style={{ fontSize: v('--text-caption'), color: v('--color-slate') }}>{s.token}</code>
            </div>
          ))}
        </SwatchGrid>
      </Section>

      <GroupHeading id="components" eyebrow="Layer 02" title="Components" />

      <CoreControls />

      <FeedComponents />

      <CardSurfaces />
    </main>
  )
}
