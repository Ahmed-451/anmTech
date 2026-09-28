import type { TeamMember } from '../content/site';
import styles from './Team.module.css';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function Team({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className={styles.team} aria-labelledby="team-heading">
      <h3 id="team-heading" className={styles.heading}>
        The team
      </h3>
      <ul className={styles.list}>
        {members.map((member) => (
          <li key={member.name} className={styles.member}>
            <span className={styles.avatar} aria-hidden="true">
              {initials(member.name)}
            </span>
            <span className={styles.text}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.role}>{member.role}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}